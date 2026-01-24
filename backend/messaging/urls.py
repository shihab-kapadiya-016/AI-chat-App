from django.urls import path
from . import views

from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("fetch-conversation/", views.load_all_conversations, name='fetch-conversation' ),
    path("delete-conversation/<int:pk>", views.delete_conversation, name="delete-conversation" ),
    path("create-conversation/", views.create_conversation, name="create-conversation" ),
    path("update-conversation/<int:pk>", views.update_conversation, name="update-conversation" ),
    path("get-messages/<int:pk>", views.display_all_messages, name='get-messages' ),
    path("send/<int:pk>/", views.send_message, name='send-message' ),
    
]
