import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const userContext = createContext({
  loggedusername: "",
  setLoggedUsername: () => {},
  id: "",
  setId: () => {},
});

export const UserContextProvider = (props) => {
  const [loggedusername, setLoggedUsername] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/profile").then((response) => {
      setId(response.data.userId || "abc");
      setLoggedUsername(response.data.username || "xyz");
    });
    console.log("hellp");
  }, [id, loggedusername]);

  return (
    <userContext.Provider
      value={{ loggedusername, setLoggedUsername, id, setId }}
    >
      {props.children}
    </userContext.Provider>
  );
};
