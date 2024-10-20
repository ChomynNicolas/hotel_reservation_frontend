
import {
  BrowserRouter,
  
  Route,
  Routes,
} from "react-router-dom";
import './App.css'
import { HomePage } from "./pages/HomePage";
import { UserLogin } from "./pages/UserLogin";
import { UserRegister } from "./pages/UserRegister";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
