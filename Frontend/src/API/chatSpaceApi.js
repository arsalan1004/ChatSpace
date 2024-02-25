import axios from 'axios';

// axios.get("http://localhost:8000/profile");
// axios.get( "http://localhost:8000/api/conversation/" + user.userId);
// axios.get("http://localhost:8000/api/messages/" + currentChat?._id);
// axios.post("http://localhost:8000/api/messages/", msg);
// axios.get("http://localhost:8000/api/users/" + friendId[0]);


const postMessageData = async (msg) => {
  console.log("In postMessageData API")
  const API_URL = "http://localhost:8000/api/messages/";

  try {
    const response = await axios.post(`${API_URL}`, msg);
    console.log("Response in postMessageData API");
    console.log(response);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }

}

// const getUserData = async () => {
//   console.log("In getUserData API")
//   const API_URL = "http://localhost:8000/profile";

//   try {
//     const response = await axios.get(API_URL);
//     console.log("Response in getUserData API")
//     console.log(response);
//     return response.data;
//   }
//   catch (error) {
//     console.log(error);
//   }
// }

const getConversationData = async (userId) => {
  console.log("In getConversationData API")
  const API_URL = "http://localhost:8000/api/conversation";

  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    console.log("Response in getConversationData API");
    console.log(response);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

const getMessagesData = async (currentChatId) => {
  console.log("In getMessagesData API")
  const API_URL = "http://localhost:8000/api/messages";

  try {
    const response = await axios.get(`${API_URL}/${currentChatId}`);
    console.log("Response in getMessagesData API");
    console.log(response);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

const getFriendData = async (friendId) => {
  console.log("In getFriendData API")
  const API_URL = "http://localhost:8000/api/users";
  // const API_URL = "http://localhost:3500/convData";
  console.log(`friendId: ${friendId}`)

  try {
    const response = await axios.get(`${API_URL}/${friendId}`);
    // console.log("Response in getFriendData API");
    console.log(response);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

const getStartNewConversationsData = async (IdObject) => {
  console.log()
  // senderId: loggedIn user Id
  // recieverId: friend OF sender
  console.log("In getStartNewConversationsData API", IdObject)
  const API_URL = "http://localhost:8000/api/conversation";
  // const API_URL = "http://localhost:3500/convData";


  try {
    const response = await axios.post(API_URL, IdObject);
    // console.log("Response in getStartNewConversationsData API");
    console.log(response);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}

const getFriendList = async (userId) => {
  // senderId: loggedIn user Id
  // recieverId: friend OF sender
  console.log("In getFriendList API", {
    userId: userId
  })
  const API_URL = "http://localhost:8000/api/fh/friendsList";
  // const API_URL = "http://localhost:3500/convData";


  try {
    const response = await axios.post(API_URL, {
      userId: userId
    });
    // console.log("Response in getStartNewConversationsData API");
    console.log(response);
    return response.data;
  }
  catch (error) {
    console.log(error);
  }
}


export{ 
        // getUserData, 
        getMessagesData, 
        getConversationData, 
        getFriendData, 
        postMessageData,
        getStartNewConversationsData,
        getFriendList
      }