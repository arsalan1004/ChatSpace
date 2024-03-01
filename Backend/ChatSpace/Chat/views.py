from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Message, MessageConv, Conversation, UserConv
from .serializers import MessageSerializer, MessageConvSerializer, ConversationSerializer

# MESSAGE APIs
class MessageList(APIView):
    """
    Getting all messages of a conversation
    """
    def get(self, request, format=None):
        conv_id = request.data['conversationId'] # Get from URL body

        if not conv_id:
            return Response({'error': 'Missing conversationId parameter'}, status=status.HTTP_400_BAD_REQUEST)

        message_conv_objects = MessageConv.objects.filter(convId=conv_id)

        # Validate query results
        if not message_conv_objects.exists():
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Efficiently obtain message details using Prefetch
        message_conv_objects = message_conv_objects.prefetch_related('messageId')

        messages = [message_conv.messageId for message_conv in message_conv_objects]

        msg_serializer = MessageSerializer(messages, many=True)

        if msg_serializer is not None:
            return Response(msg_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(msg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    """
    POSTING A MESSAGE VIEW
    """  
    def post(self, request, format=None):
        msg_data = {
            'senderId': request.data.get('sender'),
            'text': request.data.get('text')
        }

        msgSerializer = MessageSerializer(data=msg_data)

        if msgSerializer.is_valid():
            msgInstance = msgSerializer.save()
            msgConvSerializer = MessageConvSerializer(data={'convId':request.data['convId'], 'messageId':msgInstance.id})

            if msgConvSerializer.is_valid():
                msgConvSerializer.save()
                return Response(msgSerializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(msgConvSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(msgSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

# CONVERSATION APIs        
class ConversationList(APIView):
    """
    GETTING ALL CONVERSATIONS
    """
    def get(self, request, format=None):
        userId = request.data['userId']

        if not userId:
            return Response({'error': 'Missing userId parameter'},status=status.HTTP_400_BAD_REQUEST)
        
        user_convos = Conversation.objects.filter(Q(firstMember=userId) | Q(secondMember=userId))

        if not user_convos:
            return Response({'error': 'No Conversations found'},status=status.HTTP_404_NOT_FOUND)
        
        serializer = ConversationSerializer(user_convos, many=True)

        if serializer is None:
            return Response("Error occurred in conversation serializer", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            conversations = [{"id":convo['id'], "members":[convo['firstMember'], convo['secondMember']]} for convo in serializer.data]
            return Response(conversations, status=status.HTTP_200_OK)
        
    """
    POST CONVERSATIONS
    """
    def post(self, request, format=None):
        if not request.data:
            return Response({'error': 'Missing userIds parameter'}, status=status.HTTP_400_BAD_REQUEST)
                
        serializer = ConversationSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)