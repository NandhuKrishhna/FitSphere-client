import { Route, Routes } from "react-router-dom"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
function App() {


  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-300 
   flex items-center justify-center relative overflow-hidden">

    <Routes>
      <Route path="/" element={"Landing Page"} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
   </div>
  )
}

export default App
