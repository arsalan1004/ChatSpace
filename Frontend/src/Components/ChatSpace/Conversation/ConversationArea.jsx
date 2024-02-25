import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ChatModeButton from './ChatModeButton'
import Conversation from './Conversation'
import chatBubble from '../../../Assets/Icons/chatBubble.svg';
import group from '../../../Assets/Icons/group.svg'
import searchMagnifier from '../../../Assets/Icons/searchMagnifier.svg'
import newChatBubble from '../../../Assets/Icons/newChatBubble.svg'
import style from './Conversation.module.css'
import { useNavigate } from 'react-router-dom';
import SearchConversationBar from './SearchConversationBar';
import { getFriendData } from '../../../API/chatSpaceApi';
import AddConversationModel from '../AddConversationModel/AddConversationModel';




// Holds ChatModeButtons
// Holds multiple conversation mapped from object received from chatSpace

// NOTE: arsalan used singular for whole conversation array
// i am using plural

// setChatHandler -> setChat in PrivateChat






const ConversationArea = ({conversations, currentUser, setChatHandler}) => {
  


  const [freeHeight, setFreeHeight] = useState(0);
  const [searchAppear, setSearchAppear] = useState(false);
  const [modelAppear,setModelAppear] = useState(false);
  const [search, setSearch] = useState("");

  const [newConversation, setNewConversations] = useState(() => []);
  const [isloading, setIsLoading] = useState(false);
  

  const offsetRef = useRef(null);
  const searchBarRef = useRef(null);
  
  const navigate = useNavigate();
  useLayoutEffect(() => {
    // run after the element is rendered
    const offsetHeight = offsetRef.current.clientHeight; // get the element's height
    const viewportHeight = window.innerHeight; // get the viewport's height
    
    if(searchAppear == false) {
      setFreeHeight(viewportHeight - (offsetHeight + 60)); // calculate and set the free height
    }
    else {
      console.log('here');
      setFreeHeight(viewportHeight - (offsetHeight + searchBarRef.current.clientHeight + 60));
    }

    console.log(`Offset: ${offsetHeight}`);
    console.log(`viewport: ${viewportHeight}`);
    console.log(`Scroll Height(required): ${viewportHeight - (offsetHeight + 62)}`);


  }, [searchAppear]); 
   
  const onSetChat = (conversation) => {
    setChatHandler(conversation || [])
  }


  const getFriendDataHandler = async (receiver) => {
    const response  = await getFriendData(receiver)
    return response;
  }


  useEffect(() => {
    // let cancelTokens = [];
    setIsLoading(true)
    const promises = conversations.map((conversation) => {
      const receiver = conversation.members.find((m) => m !== currentUser.userId);
      // const cancelToken = axios.CancelToken.source();
      // console.log(cancelToken)
      // cancelTokens.push(cancelToken);

      return getFriendDataHandler(receiver)
      .then((response) => ({ 
        recieverName: response.username,
        receiverId: receiver
      }));
    });

    Promise.all(promises)
      .then((friendData) => {
        // This code executes when all API calls are finished
        console.log("All API calls completed!");
        console.log("Friend data:", friendData);
    
        const newConv = conversations?.map((conv, index) => 
        ({...conv, recieverName: friendData[index]?.recieverName})
        )
        console.log(newConv)
        setNewConversations(() => newConv);

        setIsLoading(false);
      })
      .catch((error) => {
        // Handle any errors that occur during API calls
        console.error("Error fetching friend data:", error);
      });
  
     
      return () => {
        // console.log(cancelTokens)
        // cancelTokens.forEach((cancelToken) => cancelToken.cancel())
      }

  }, [conversations])
  
 

  useEffect(() => {
    console.log(`In newConversations: ${newConversation}`)
    console.log(newConversation)
  
  }, [newConversation])


  const modelAppearHandler = (value) => {
    setModelAppear(value);
  }
  



  return (
    <section className='bg-primary-100 w-[30%] font-Roboto conversation-shadow-right min-w-[220px]' >
      {
        modelAppear && 
          <AddConversationModel 
            onModelClose = {() => modelAppearHandler(false)}
            user = {currentUser}
          />
      }
      <div >
        <div className='flex justify-evenly items-center w-[99.8%] h-[57px]' 
          id='scroll-offset' 
          ref={offsetRef}
          style={{
            outline: "#D3D3D3 solid 1px"
          }}
        >
          <ChatModeButton
            img={chatBubble}
            dimensions = {25}
            altText={'private-chat'}
            handler={() => navigate("/Chat/PrivateChat")}

          />
          <ChatModeButton
            img={group}
            dimensions = {35}
            altText={'group-chat'}
            handler={() => navigate("/Chat/GroupChat")}
          />
          <ChatModeButton
            img={newChatBubble}
            dimensions = {35}
            altText={'group-chat'}
            handler={() => modelAppearHandler(true)}
          />
          <ChatModeButton
            img={searchMagnifier}
            dimensions = {25}
            altText={'search-icon'}
            handler={() => setSearchAppear((sA) => !sA)}
          />
        </div>
        {  searchAppear &&
            <div 
              className='bg-[#6bb4c5]'
              ref = {searchBarRef}
            >
              <SearchConversationBar 
                search={search}
                setSearch={setSearch}
                setSearchAppear = {setSearchAppear}
                searchAppear = {searchAppear}
          
              />
            </div>
        }
        
        <div className=' bg-primary-100'>
          <div  className={style['scrollStyle']} 
                style={{
                maxHeight: `${freeHeight}px`, 
                minHeight: `${freeHeight}px`,
              }}
            >
         
            {
              !isloading ?  (searchAppear ? 
              (
                <>
                  {
                  
                    (newConversation.filter((conv) => 
                      ((conv.recieverName).toLowerCase()).includes(search?.toLowerCase())))
                      .map((conv, index) =>
                        <Conversation 
                          key = {index}
                          conversation = {conv}
                          currentUser = {currentUser}
                          lastMessage = { conv.lastMessage ||"No Usersssssssssssssssssssssssssssssssssss"}
                          onSetChat = {onSetChat}
                          reciever={conv.recieverName}
                          userNo={index}
                          // reciever = {recievers && (recievers?.[index][`${conversation.members.find(m => m !== currentUser.userId)[0]}`])}
                        />
                      )
                    
                }
              </>
              )
              : newConversation.map((conv, index) =>
                    <Conversation 
                      key = {index}
                      conversation = {conv}
                      currentUser = {currentUser}
                      lastMessage = { conv.lastMessage ||"No Usersssssssssssssssssssssssssssssssssss"}
                      onSetChat = {onSetChat}
                      reciever={conv.recieverName}
                      userNo={index}
                    />
                )) : <p>Loading your Conversations</p>
            }
          </div>
        </div>

      </div>
    </section>
  )
}

export default ConversationArea

{/* conversations?.map(conversation =>
          <Conversation 
            conversation = {conversation}
            currentUser = {user}
            lastMessage = {"No last Message"}
            onSetChat = {onSetChat}
          />
        ) */}



        {/* (conversations.filter((conv) => 
                      ((conv.lastMessage.text).toLowerCase()).includes(search.toLowerCase())))
                      .map((conversation, index) =>
                        <Conversation 
                          key = {index}
                          conversation = {conversation}
                          currentUser = {currentUser}
                          lastMessage = { conversation.lastMessage ||"No Usersssssssssssssssssssssssssssssssssss"}
                          onSetChat = {onSetChat}
                          reciever = {recievers && (recievers?.[index][`${conversation.members.find(m => m !== currentUser.userId)}`])}
                        />
                      ) */}