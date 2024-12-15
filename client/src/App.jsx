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
import MenuBoard from "./pages/public/Menu/MenuBoard";




function Root() {
  return (
    <div >
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
        <Route path="menu" element={<MenuBoard/>} /> 

        {/* { Public Routes } */}
         <Route path="/auth" element={true && <Outlet />}>
          <Route index element={<SignIn />} /> 
          <Route path="sign-in" element={<SignIn />} /> 
          <Route path="sign-up" element={<SignUp />} /> 
          <Route path="forgot-password" element={<ForgotPassword />} /> 


        </Route> 

      </Route>))

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
