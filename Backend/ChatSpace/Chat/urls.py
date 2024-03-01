from django.urls import path
from . import views

urlpatterns = [
    path('message/', views.MessageList.as_view(), name="message"),
    path('conversation/', views.ConversationList.as_view(), name="Conversation")
]