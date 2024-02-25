import React from "react";
import {createBrowserRouter} from 'react-router-dom';
import PrivateChat from '../Components/ChatSpace/PrivateChat'

const router = createBrowserRouter([{
    path:'/',
    element:<PrivateChat/>
}])

export default router;