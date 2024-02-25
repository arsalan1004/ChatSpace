import React, {  useState, useEffect } from 'react'
import ChatHeader from './ChatHeader/ChatHeader'
import ConversationArea from './Conversation/ConversationArea'
import MessageArea from './Message/MessageArea'
import ChatInitialScreen from './ChatInitialScreen'
import { getConversationData, getFriendData, getMessagesData, postMessageData } from '../../API/chatSpaceApi'
import axios from 'axios'
import { io } from 'socket.io-client'
//import { useSelector } from 'react-redux'
const PrivateChat = () => {
  //const {id, username}  = useSelector(state => state.login)
  const currentUser = {
    userId: "659815525ce38b434230fbe0",
    username: "ahad_raza"
  }
  console.log("currentUser", currentUser)
  // TODO:
  ///// FRONTEND


  ///// BACKEND
  // lastMessage for show in conversation
  // Socket crashed on messageSend

  // currentChat -> filter member/receiver -> 
  // const [conversations, setConversations] = useState([
  //   {
  //     // userId hardcode for now, will come from redux afterwards
  //     conversationId : "conv1",
  //     profileUrl: "firbase",
  //     lastMessage: {
  //       text: "hello 2 from 1",
  //       time: "2h" 
  //     },
  //     members: [
  //       "1",
  //       "2"
  //     ]
  //   },
  //   {
  //     // userId hardcode for now, will come from redux afterwards
  //     conversationId : "conv2",
  //     profileUrl: "firbase",
  //     lastMessage: {
  //       text: "hello 3 from 1",
  //       time: "4h" 
  //     },
  //     members: [
  //       "1",
  //       "3"
  //     ]
  //   },
  //   {
  //     // userId hardcode for now, will come from redux afterwards
  //     conversationId : "conv3",
  //     profileUrl: "firbase",
  //     lastMessage: {
  //       text: "hello 3 from 2",
  //       time: "6h" 
  //     },
  //     members: [
  //       "2",
  //       "3"
  //     ]
  //   },
  //   {
  //     // userId hardcode for now, will come from redux afterwards
  //     conversationId : "conv4",
  //     profileUrl: "firbase",
  //     lastMessage: {
  //       text: "hello 4 from 1",
  //       time: "8h" 
  //     },
  //     members: [
  //       "1",
  //       "4"
  //     ]
  //   },
    
  //   {
  //     // userId hardcode for now, will come from redux afterwards
  //     conversationId : "conv1",
  //     profileUrl: "firbase",
  //     lastMessage: {
  //       text: "hello 2 from 1",
  //       time: "2h" 
  //     },
  //     members: [
  //       "1",
  //       "2"
  //     ]
  //   },
  //   {
  //     // userId hardcode for now, will come from redux afterwards
  //     conversationId : "conv2",
  //     profileUrl: "firbase",
  //     lastMessage: {
  //       text: "hello 3 from 1",
  //       time: "4h" 
  //     },
  //     members: [
  //       "1",
  //       "3"
  //     ]
  //   },
  //   {
  //     // userId hardcode for now, will come from redux afterwards
  //     conversationId : "conv3",
  //     profileUrl: "firbase",
  //     lastMessage: {
  //       text: "hello 3 from 2",
  //       time: "6h" 
  //     },
  //     members: [
  //       "2",
  //       "3"
  //     ]
  //   },
  //   {
  //     // userId hardcode for now, will come from redux afterwards
  //     conversationId : "conv4",
  //     profileUrl: "firbase",
  //     lastMessage: {
  //       text: "hello 4 from 1",
  //       time: "8h" 
  //     },
  //     members: [
  //       "1",
  //       "4"
  //     ]
  //   },
  //   {
  //     // userId hardcode for now, will come from redux afterwards
  //     conversationId : "conv1",
  //     profileUrl: "firbase",
  //     lastMessage: {
  //       text: "hello 2 from 1",
  //       time: "2h" 
  //     },
  //     members: [
  //       "1",
  //       "2"
  //     ]
  //   },
  //   {
  //     // userId hardcode for now, will come from redux afterwards
  //     conversationId : "conv2",
  //     profileUrl: "firbase",
  //     lastMessage: {
  //       text: "hello 3 from 1",
  //       time: "4h" 
  //     },
  //     members: [
  //       "1",
  //       "3"
  //     ]
  //   },
  //   {
  //     // userId hardcode for now, will come from redux afterwards
  //     conversationId : "conv3",
  //     profileUrl: "firbase",
  //     lastMessage: {
  //       text: "hello 3 from 2",
  //       time: "6h" 
  //     },
  //     members: [
  //       "2",
  //       "3"
  //     ]
  //   },
  //   {
  //     // userId hardcode for now, will come from redux afterwards
  //     conversationId : "conv4",
  //     profileUrl: "firbase",
  //     lastMessage: {
  //       text: "hello 4 from 1",
  //       time: "8h" 
  //     },
  //     members: [
  //       "1",
  //       "4"
  //     ]
  //   },
    
  // ]);

  // user: {userId, userName}
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState({});
  const [currentChat, setCurrentChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showInitial, setShowInitial] = useState(true);
  const [onlineUsers, setOnlineUsers]  = useState([]);
  // const [currentChat, setCurrentChat] = useState({
  //   conversationId : "conv1",
  //   profileUrl: "firbase",
  //   lastMessage: {
  //     text: "hello 2 from 1",
  //     time: "2h" 
  //   },
  //   members: [
  //     "1",
  //     "2"
  //   ]
  // });
  // const [messages, setMessages] = useState([
  //   {
  //     conversationId : "conv1",
  //     senderId: "2",
  //     text : "hello 1 from 2",
  //     createdAt: '2 PM'
  //   },
  //   {
  //     conversationId : "conv1",
  //     senderId: "1",
  //     text : "hello World",
  //     createdAt: '2 PM'
  //   },
  //   {
  //     conversationId : "conv1",
  //     senderId: "2",
  //     text : "Twinkle Twiinkle",
  //     createdAt: '2 PM'
  //   },
  //   {
  //     conversationId : "conv1",
  //     senderId: "1",
  //     text : "Humpty Dumptysssss sssssssssssssssssssssssss ssssssssssssssssssssssssssssssss ssssssssssss",
  //     createdAt: '2 PM'
  //   },
  //   {
  //     conversationId : "conv1",
  //     senderId: "1",
  //     text : "lorem Ipsum",
  //     createdAt: '2 PM'
  //   },
  //   {
  //     conversationId : "conv1",
  //     senderId: "2",
  //     text : "dolor amet",
  //     createdAt: '2 PM'
  //   },
  //   {
  //     conversationId : "conv1",
  //     senderId: "1",
  //     text : "lorem Ipsum",
  //     createdAt: '2 PM'
  //   },
  //   {
  //     conversationId : "conv1",
  //     senderId: "2",
  //     text : "dolor amet",
  //     createdAt: '2 PM'
  //   },
  //   {
  //     conversationId : "conv1",
  //     senderId: "1",
  //     text : "lorem Ipsum",
  //     createdAt: '2 PM'
  //   },
  //   {
  //     conversationId : "conv1",
  //     senderId: "2",
  //     text : "dolor amet",
  //     createdAt: '2 PM'
  //   },
  //   {
  //     conversationId : "conv1",
  //     senderId: "1",
  //     text : "lorem Ipsum",
  //     createdAt: '2 PM'
  //   },
  //   {
  //     conversationId : "conv1",
  //     senderId: "2",
  //     text : "dolor amet",
  //     createdAt: '2 PM'
  //   },
  // ]);


  const [arrivalMessages, setArrivalMessages] = useState("");

  const [socket, setSocket] = useState(null);
  
  axios.defaults.withCredentials = true;

  // SET SOCKET USEEFFECT
  useEffect(() => {
    const SOCKET_URL = "http://localhost:8900";
    try {
      const conn = io(SOCKET_URL);
      console.log("IN SOCKET");
      console.log(conn)
      setSocket(conn);
    } catch (error) {
      console.log(`Error at socket connection ${error}`);
    }
  }, []);




  // Get and set the user data
  useEffect(() => {
    // const getUserDataHandler = async () => {
    //   const response = await getUserData();
    //   setUser(response || {});
    // }
    // getUserDataHandler();
    // const getuserData = async () => {
    //   const response = await axios.get("http://localhost:8000/profile");
    //   setUser(response.data || {});
    // };

    // getuserData();
    const getFriendDataHandler = async () => {
 
      const response = await getFriendData(currentUser.userId);
      console.log({...response});
      setUser({...response, userId: currentUser.userId})
    }
    getFriendDataHandler();
    // setUser({
    //   userId: "659815525ce38b434230fbe0",
    //   username: "ahad122"
    // })
    // setUser({
    //   userId: "65901f9ae137a46acf78c715",
    //   username: "Alex Johnson"
    // })
    // setUser(currentUser)
  }, []);

  // listen to initial socket event
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

  // get the conversations and set the conversation state
  useEffect(() => {
    const getConversationDataHandler = async () => {
      const response = await getConversationData(user.userId)
      console.log("IN GET CONVERSATION HANDLER");
      console.log(response)
      setConversations(response || []);
    }
    getConversationDataHandler();
    // const getConversations = async () => {
    //   try {
    //     const res = await axios.get(
    //       "http://localhost:8000/api/conversation/" + user.userId
    //     );
    //     setConversation(res.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // getConversations();
  }, [user]);

  // emit socket event to user to send user id
  // FOR GETTNG ONLINE CONNECTED USERS
  useEffect(() => {
    try {
      if (socket) {
        console.log("inside sending data useeffect");
        // send user data to client
        socket?.emit("addUser", user.userId);

        // get users from socket backend
        socket?.on("getUser", (users) => {
          console.log(users);
          setOnlineUsers(users || []);
          console.log("ONLINE USERS UPDATED");
        });
      }
    } catch (error) {
      console.log(`error in sending userId useffect in socket ${error}`);
    }
  }, [user]);

  useEffect(() => {
    console.log("ONLINE USERS UPDATED IN USE_EFFECT");
    console.log(onlineUsers);
  }, [onlineUsers])




  // GET THE MESSAGES AND SET THE MESSAGE STATE
  useEffect(() => {
    const getMessagesDataHandler = async () => {
      const response = await getMessagesData(currentChat?._id);
      setMessages(response);
    }
    getMessagesDataHandler();
    
    
    // const getMessages = async () => {
    //   try {
    //     const res = await axios.get(
    //       "http://localhost:8000/api/messages/" + currentChat?._id
    //     );
    //     setMessages(res.data);
    //   } catch (error) {
    //     console.log(`Error in message get api ${error}`);
    //   }
    // };
    // getMessages();
  }, [currentChat]);

  // scroll to bottom on getting messages useEffect
  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  // Handle sending messages useEffect
  const handleButtonSubmit = async (newMessage) => {
    // e.preventDefault();
    console.log("In message Submit handler")
    console.log(newMessage);
    const msg = {
      conversationId: currentChat._id,
      sender: user.userId,
      text: newMessage,
    };
    try {
      console.log(
        "receiver",
        currentChat.members.find((mem) => mem !== user.userId),
        user.userId,
        newMessage
      );
      await socket?.emit("sendMessage", {
        senderId: user.userId,
        receiverId: currentChat.members.find((mem) => mem !== user.userId),
        text: newMessage,
      });
    
    } catch (error) {
      console.log(`error at sendMessage socket event ${error}`);
    }



    const postMessageDataHandler = async () => {
      const response = await postMessageData(msg);
      console.log(response);
      setMessages([...messages, response]);
    }
    postMessageDataHandler();


    // try {
    //   const res = await axios.post("http://localhost:8000/api/messages/", msg);
    //   console.log(res);
    //   setMessages([...messages, res.data]);
    //   setNewMessages("");
    // } catch (error) {
    //   console.log(`Error occured at handle message send button ${error}`);
    // }
  };

  // get messages socket useeffect
  // socket?.on("getMessage", (data) => {
  //   console.log("In getMessage Socket Listen");
  //   console.log(data)

  //   setArrivalMessages(() => ({
  //     sender: data.senderId,
  //     text: data.text,
  //     createdAt: Date.now(),
  //   }));
  // });


  useEffect(() => {
    try {
      socket?.on("getMessage", (data) => {
      console.log("In getMessage Socket Listen");
      console.log(data)
  
      setArrivalMessages(() => ({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      }));
    });
  } catch (error) {
    console.log("Error while listenning to getMessages Socket")
    console.log(error);
  }

  }, [socket])

  






  useEffect(() => {
    console.log("currentChat Members: ");
    console.log(currentChat);
    console.log("Arrival Messages: ");
    console.log(arrivalMessages);

    if(showInitial == false) {
      arrivalMessages &&
      currentChat?.members.includes(arrivalMessages.sender) &&
      setMessages((prev) =>( [...prev, arrivalMessages]));
    }
    // arrivalMessages &&
    //   currentChat?.members.includes(arrivalMessages.sender) &&
    //   setMessages((prev) =>( [...prev, arrivalMessages]));
  }, [arrivalMessages, currentChat]);

  
  const setCurrentChatHandler = (chat) => {
    if(showInitial == true) setShowInitial(false);
    setCurrentChat(chat || []);
    console.log("CHAT SET");
    console.log(chat)
  };

  // const handleButtonSubmit = (newMessage) => {
  //   console.log(`In PrivateChat: ${newMessage}`)
  //   const msg = {
  //     conversationId: currentChat.conversationId,
  //     sender: user.userId,
  //     text: newMessage,
  //   };
  //   console.log(msg);

  //   console.log(`receiver: ${currentChat.members.find((mem) => mem !== user.userId)}`);
  //   console.log(`user: ${user.userId}`);
  //   console.log(`message: ${newMessage}`)
   
  //   const mess = {
  //     conversationId : currentChat.conversationId,
  //     senderId: user.userId,
  //     text : newMessage,
  //     createdAt: currentformatedTimestamp()
  //   }
  //   console.log(mess);
  //   setMessages((prevMessage) => [...prevMessage, mess]);

  // }


  console.log("CURRENT CHAT");
  console.log(currentChat);

  return (
    <section className='w-screen h-screen'>
      <ChatHeader user = {user}/>
      <div className='flex'>
        <ConversationArea 
          conversations = {conversations} 
          currentUser = {user}
          setChatHandler={setCurrentChatHandler}
        />
        {
          showInitial  ? <ChatInitialScreen />
           : 
           (<MessageArea 
            messages={messages}
            user={user}
            handleMessageSubmit = {handleButtonSubmit}
            currentChat = {currentChat}
            onlineUsers = {onlineUsers}
          
          />)
        }
      

      </div>
    </section>
  )
}

export default PrivateChat

  