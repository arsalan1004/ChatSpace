from django.db import models


# Create your models here.

class User(models.Model):
    firstName = models.CharField(max_length=200)
    lastName = models.CharField(max_length=200)

class Message(models.Model):
    text = models.CharField(max_length=300)
    time = models.TimeField(auto_now=True)

class Conversation(models.Model):
    firstMember = models.ForeignKey(User, on_delete=models.CASCADE, related_name='first_member_conversations')
    secondMember = models.ForeignKey(User, on_delete=models.CASCADE, related_name='second_member_conversations')
    lastMessage = models.ForeignKey(Message, on_delete=models.CASCADE)

# User and Conversation Join class
class UserConv(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    convId = models.ForeignKey(Conversation, on_delete=models.CASCADE)

# Message and Conversation Join class
class UserConv(models.Model):
    convId = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    messageId = models.ForeignKey(Message, on_delete=models.CASCADE)

