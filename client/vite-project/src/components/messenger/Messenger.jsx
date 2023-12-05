import React, { useEffect, useRef, useState } from "react";
import "./Messenger.css";
import Conversation from "../conversations/Conversation";
import Message from "../message/Message";
import ChatOnline from "../chatOnline/ChatOnline";
import axios from "axios";
import { io } from "socket.io-client";

function Messenger() {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [messages, setMessages] = useState("");
  const [newMessages, setNewMessages] = useState("");
  const [arrivalMessages, setArrivalMessages] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);
  const [tracker, setTracker] = useState("");
  const scrollRef = useRef();

  // SET SOCKET USEEFFECT
  useEffect(() => {
    try {
      const conn = io("http://localhost:8900");
      setSocket(conn);
    } catch (error) {
      console.log(`Error at socket connection ${error}`);
    }
  }, []);

  // listen to socket events
  useEffect(() => {
    try {
      if (socket) {
        socket?.on("welcome", (message) => {
          console.log("this is backend message", message);
        });
      }
    } catch (error) {
      console.log(`Error at socket welcone event ${error}`);
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessages &&
      currentChat?.members.includes(arrivalMessages.sender) &&
      setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, currentChat]);

  // emit socket event to user to send user id
  useEffect(() => {
    try {
      if (socket) {
        console.log("inside sending data useeffect");
        // send user data to client
        socket?.emit("addUser", user.userId);

        // get users from socket backend
        socket?.on("getUser", (users) => {
          console.log(users);
        });
      }
    } catch (error) {
      console.log(`error in sending userId useffect in socket ${error}`);
    }
  }, [user]);

  // set the chat useEffect
  const setChat = (chat) => {
    setCurrentChat(chat);
  };

  // Handle sending messages useEffect
  const handleButtonSubmit = async (e) => {
    e.preventDefault();
    const msg = {
      conversationId: currentChat._id,
      sender: user.userId,
      text: newMessages,
    };
    try {
      console.log(
        "receiver",
        currentChat.members.find((mem) => mem !== user.userId),
        user.userId,
        newMessages
      );
      socket?.emit("sendMessage", {
        senderId: user.userId,
        receiverId: currentChat.members.find((mem) => mem !== user.userId),
        text: newMessages,
      });
      console.log("calling function");
      getMessageEvent();
      console.log("after calling function");
    } catch (error) {
      console.log(`error at sendMessage socket event ${error}`);
    }

    try {
      const res = await axios.post("http://localhost:3000/api/messages/", msg);
      setMessages([...messages, res.data]);
      setNewMessages("");
    } catch (error) {
      console.log(`Error occured at handle message send button ${error}`);
    }
  };

  // Get and set the user data
  useEffect(() => {
    const getuserData = async () => {
      const response = await axios.get("http://localhost:3000/profile");
      setUser(response.data || {});
    };

    getuserData();
  }, []);

  // get the conversations and set the conversation state
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/conversation/" + user.userId
        );
        setConversation(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user]);

  // GET THE MESSAGES AND SET THE MESSAGE STATE
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(`Error in message get api ${error}`);
      }
    };
    getMessages();
  }, [currentChat]);

  // get messages socket useeffect

  function getMessageEvent() {
    console.log("In get mesage function");
    socket?.on("getMessage", (data) => {
      console.log(data);
      setArrivalMessages({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
      console.log({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }

  // useEffect(() => {
  //   console.log("i am in getMessage useEffect");
  //   socket?.on("getMessage", (data) => {
  //     setArrivalMessages({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //     console.log({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  // scroll to bottom on new messages useEffect
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />

            {conversation.map((c) => {
              return (
                <div onClick={() => setChat(c)}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => {
                    return (
                      <div ref={scrollRef}>
                        <Message message={m} own={m.sender === user.userId} />
                      </div>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="Type message"
                    className="chatMessageInput"
                    onChange={(e) => setNewMessages(e.target.value)}
                    value={newMessages}
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    onClick={handleButtonSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
