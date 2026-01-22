from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Conversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='conversations')
    title = models.TextField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Conversation {self.id} - {self.user.username}'
    

class Message(models.Model):
    class Role(models.TextChoices):
        user = "USER", "User"
        AI = "AI","AI"
        
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(User,related_name='sent_messages',on_delete=models.CASCADE)
    content = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    role = models.CharField(max_length=10,choices=Role.choices,default='user')

    def __str__(self):  
        return f'{"AI" if self.role == "AI" else self.sender.username}: {self.content[:20]}'
