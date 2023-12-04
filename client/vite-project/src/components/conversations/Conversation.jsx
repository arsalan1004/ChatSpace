import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "../../userContext";
import "./Conversation.css";

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const friendId = conversation.members.filter(
      (m) => m !== currentUser.userId
    );

    const getFriend = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/users/" + friendId[0]
        );
        setUser(res.data);
      } catch (error) {
        console.log(`get friend error ${error}`);
      }
    };
    getFriend();
  }, [currentUser, conversation]);

  return (
    <>
      <div className="conversation">
        <div className="conversationImage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <span className="conversationName">{user.username}</span>
      </div>
    </>
  );
}

export default Conversation;
