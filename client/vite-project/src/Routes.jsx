import React, { useContext } from "react";
import Register from "./components/Register";
import { userContext } from "./userContext";
import { Link, Navigate, redirect } from "react-router-dom";

function Routes() {
  const { loggedusername: username, id } = useContext(userContext);
  console.log(username, id);

  return id && username ? <Navigate to={"/chat"} /> : <Register />;
}

export default Routes;
