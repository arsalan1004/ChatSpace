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
