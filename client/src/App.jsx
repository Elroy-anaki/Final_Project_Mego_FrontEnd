import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import NavBar from "./pages/public/NavBar/NavBar";
import Home from "./pages/public/Home/Home";
import About from "./pages/public/About/About";
import SignUp from './forms/Auth/SingUp/SingUp'
import SignIn from './forms/Auth/SignIn/SignIn';
import ForgotPassword from "./forms/Auth/ForgotPassword/ForgotPassword";
import OrderPlace from "./pages/public/OrderPlace/OrderPlace";
import MenuBoard from "./pages/public/Menu/MenuBoard";
import EmailVerification from "./forms/Auth/EmailVerification/EmailVerification";




function Root() {
  return (
    <div className="flex flex-col" >
        <NavBar />
        <Outlet />
        
    </div>
  )
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index  element={<Home />} />
        <Route path="home"  element={<Home />} />
        <Route path="about" element={<About/>}/>
        <Route path="order-place" element={<OrderPlace/>}/>
        <Route path="menu" element={<MenuBoard/>} /> 

        {/* { Public Routes } */}
         <Route path="/auth" element={true && <Outlet />}>
          <Route index element={<SignIn />} /> 
          <Route path="sign-in" element={<SignIn />} /> 
          <Route path="sign-up" element={<SignUp />} /> 
          <Route path="forgot-password" element={<ForgotPassword />} /> 
          <Route path="email-verification/:userId" element={<EmailVerification />} /> 


        </Route> 

      </Route>))

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
