from django.urls import path
from . import views
urlpatterns = [
    path("fetch-conversation", views.load_all_conversations, name='fetch-conversation' ),
    path("get-messages/<int:pk>", views.display_all_messages, name='get-messages' ),
    path("send/<int:pk>/", views.send_message, name='send-message' ),
        
]
