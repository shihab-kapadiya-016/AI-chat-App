from django.shortcuts import render, get_object_or_404
from .models import Message, Conversation
from .serializer import MessageSerializer, ConversationSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


# Create your views here.

@api_view(['GET'])
def load_all_conversations(request):
    conversations = Conversation.objects.filter(user=request.user).order_by('created_at')
    serializer = ConversationSerializer(conversations, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def display_all_messages(request, pk):
    conversation = get_object_or_404(Conversation, id = pk , user = request.user)

    if not conversation:
        return Response(
            {"error": "Cannot fetch message cause the conversation probably doesn't exist. Please check the pk"}, 
            status=404
        )
    
    messages = Message.objects.filter(sender=request.user, conversation = conversation.id).order_by('created_at')
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

    ai_reply = f'You Said {user_message}'

    ai_message = Message.objects.create(
        conversation = conversation,
        sender = request.user,
        content=ai_reply,
        role = "AI"
    )

    serializer = MessageSerializer(ai_message)
    return Response(serializer.data)

