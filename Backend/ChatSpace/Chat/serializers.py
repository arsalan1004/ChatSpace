from rest_framework import serializers
from Chat.models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstName', 'lastName']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'text', 'time', 'senderId']

class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = ['id', 'firstMember', 'secondMember', 'lastMessage']

class UserConvSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserConv
        fields = ['id','userId', 'convId']

class MessageConvSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageConv
        fields = ['id', 'convId', 'messageId']

