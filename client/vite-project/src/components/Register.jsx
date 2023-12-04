import React, { useContext } from "react";
import { useState } from "react";

import axios from "axios";
import { userContext } from "../userContext";
import { Navigate, redirect } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [IsLoginOrRegister, setIsLoginOrRegister] = useState("register");
  const url = IsLoginOrRegister === "register" ? "register" : "login";
  const { loggedusername, id, setLoggedUsername, setId } =
    useContext(userContext);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const response = await axios.post(`http://localhost:3000/${url}`, {
      username,
      password,
    });

    setLoggedUsername(username);
    setId(response.data.userId);
  };

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mn-12" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          placeholder="username"
          className="block w-full rounded-sm p-2 m-2 border"
        />
        <input
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          placeholder="password"
          className="block w-full rounded-sm p-2 m-2 border"
        ></input>
        <button
          className="bg-blue-500 text-white block w-full rounded-sm p-2"
          onClick={() => redirect("/chat")}
        >
          {IsLoginOrRegister === "register" ? "Register" : "Login"}
        </button>
        <div className="text-center mt-2">
          Already a member?
          <button onClick={() => setIsLoginOrRegister("login")}>
            Login here
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
