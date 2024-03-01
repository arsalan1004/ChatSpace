from django.db import models


# Create your models here.

class User(models.Model):
    firstName = models.CharField(max_length=200)
    lastName = models.CharField(max_length=200)

class Message(models.Model):
    senderId = models.ForeignKey(User, on_delete=models.CASCADE,blank=True, default='')
    text = models.CharField(max_length=300)
    time = models.TimeField(auto_now=True)

class Conversation(models.Model):
    firstMember = models.ForeignKey(User, on_delete=models.CASCADE, related_name='first_member_conversations')
    secondMember = models.ForeignKey(User, on_delete=models.CASCADE, related_name='second_member_conversations')
    lastMessage = models.ForeignKey(Message, on_delete=models.CASCADE,blank=True, default='', null=True)

# User and Conversation Join class
class UserConv(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, default='')
    convId = models.ForeignKey(Conversation, on_delete=models.CASCADE, blank=True, default='')

# Message and Conversation Join class
class MessageConv(models.Model):
    convId = models.ForeignKey(Conversation, on_delete=models.CASCADE, blank=True, default='')
    messageId = models.ForeignKey(Message, on_delete=models.CASCADE, blank=True, default='')

