from django.shortcuts import render, get_object_or_404
from .models import Message, Conversation
from .serializer import MessageSerializer, ConversationSerializer
from .llm import get_ai_response

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated



# Create your views here.

@api_view(['GET'])
def load_all_conversations(request):
    conversations = Conversation.objects.filter(user=request.user).order_by('created_at')
    serializer = ConversationSerializer(conversations, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_conversation(request, pk):
    conversation = get_object_or_404(Conversation, id = pk, user = request.user)
    
    conversation.delete()    
    return Response("deleted successfully")

@api_view(['POST'])
def create_conversation(request):
    title = request.data.get('title')

    if not title:
        return Response({'error': 'title cannot be empty'}, status=400)


    conversation = Conversation.objects.create(
        user = request.user,
        title = title
    )

    serializer = ConversationSerializer(conversation)
    return Response(serializer.data)

@api_view(['PUT'])
def update_conversation(request, pk):
    if not request.data.get('title'):
        return Response({'error': 'title cannot be empty'}, status=400)

    conversation = get_object_or_404(Conversation, id=pk, user = request.user )

    serializer = ConversationSerializer(instance = conversation, partial = True , data = request.data )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status = 400)

@api_view(['GET'])
def display_all_messages(request, pk):
    conversation = get_object_or_404(Conversation, id = pk , user = request.user)

    if not conversation:
        return Response(
            {"error": "Cannot fetch message cause the conversation probably doesn't exist. Please check the pk"}, 
            status=404
        )
    
    messages = Message.objects.filter(conversation = conversation).order_by('created_at')
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def send_message(request, pk):
    user_message = request.data.get('content')

    if not user_message:
        return Response({'error': 'Message cannot be empty'}, status=400)
    
    conversation = get_object_or_404(
        Conversation,
        id = pk,
        user = request.user
    )


    user_msg = Message(
        conversation = conversation,
        sender = request.user,
        content=user_message,
        role = "USER"
    )

    history = Message.objects.filter(
        conversation = conversation
    ).order_by('created_at')[:10]

    llm_messages = [
        {'role': "system", "content" : "You are a helpful AI assistant "}
    ]    

    for msg in history:
        llm_messages.append({
            "role": "user" if msg.role == "USER" else "assistant",
            "content":msg.content
        })
    ai_reply = get_ai_response(llm_messages)

    ai_message = Message.objects.create(
        conversation = conversation,
        sender = request.user,
        content = ai_reply,
        role = "AI"
    )

    serializer = MessageSerializer(ai_message)
    return Response(serializer.data)

