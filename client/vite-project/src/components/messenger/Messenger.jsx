import React, { useEffect, useState } from "react";
import "./Messenger.css";
import Conversation from "../conversations/Conversation";
import Message from "../message/Message";
import ChatOnline from "../chatOnline/ChatOnline";
import axios from "axios";

function Messenger() {
  const [conversation, setConversation] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    const getuserData = async () => {
      const response = await axios.get("http://localhost:3000/profile");
      console.log(response.data);
      setUser(response.data || {});
    };

    getuserData();
  }, []);

  useEffect(() => {
    const getConversations = async () => {
      console.log(user);
      try {
        const res = await axios.get(
          "http://localhost:3000/api/conversation/" + user.userId
        );
        console.log(res.data);
        setConversation(res.data);
        console.log(conversation);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
    console.log(conversation);
  }, [user]);

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

            {console.log(conversation)}
            {conversation.map((c) => {
              return <Conversation conversation={c} currentUser={user} />;
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message own={false} />
              <Message own={true} />
            </div>
            <div className="chatBoxBottom">
              <textarea
                placeholder="Type message"
                className="chatMessageInput"
              ></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
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
