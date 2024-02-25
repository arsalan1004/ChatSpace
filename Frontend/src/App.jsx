import router from './Routes/router'
import { RouterProvider } from 'react-router-dom'
import './App.css'
function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App