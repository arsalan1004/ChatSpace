from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Message, MessageConv
from .serializers import MessageSerializer, MessageConvSerializer

class MessageList(APIView):
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