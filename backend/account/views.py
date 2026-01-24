from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegisterSerializer


# Create your views here.

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data = request.data)

    if serializer.is_valid():
        user = serializer.save()
    
        return Response(
                {
                    "message": "Registered successfully.",
                    "user_id": user.id,
                },
                status=status.HTTP_201_CREATED
            )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def logout(request):
    try:
        refresh_token = request.data.get("refresh")
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"message": "Logged out successfully"})
    except Exception:
        return Response({"error": "Invalid token"}, status=400)