import "./index.css";
import Routes from "./Routes";
import { UserContextProvider } from "./userContext";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.withCredentials = true;

  return (
    <>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </>
  );
}

export default App;
