import { lazy, useContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import TableModal from "./modals/TableDrawer/TableDrawer";
import { AuthContext } from "./contexts/AuthContext";
import Payment from "./pages/public/Payment/Payment";
import OrdersHistory from "./pages/public/OrdersHistory/OrdersHistory";

// Import Public Pages
const NavBar = lazy(() => import("./pages/public/NavBar/NavBar"));
const Home = lazy(() => import("./pages/public/Home/Home"));
const About = lazy(() => import("./pages/public/About/About"));
const ContactUs = lazy(() => import("./pages/public/ContactUs/ContactUs"));
const OrderPlace = lazy(() => import("./pages/public/OrderPlace/OrderPlace"));
const MenuBoard = lazy(() => import("./pages/public/Menu/MenuBoard"));
const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'));


// Import Auth Components
const SignUp = lazy(() => import('./forms/Auth/SingUp/SingUp'));
const SignIn = lazy(() => import('./forms/Auth/SignIn/SignIn'));
const AddReviewMeal = lazy(() => import("./pages/public/AddReviewMeal/AddReviewMeal"));
const ForgotPassword = lazy(() => import("./forms/Auth/ForgotPassword/ForgotPassword"));
const ResetPassword = lazy(()=> import("./forms/Auth/ResetPassword/ResetPassword"))
const EmailVerification = lazy(() => import("./forms/Auth/EmailVerification/EmailVerification"))
const ProfileModal = lazy(() => import("./modals/ProfileModal"));
const MealModal = lazy(() => import('./pages/public/Menu/Modal/MealModal'));
const TableDrawer = lazy(() => import('./modals/TableDrawer/TableDrawer'));
const Checkout = lazy(() => import('./pages/public/Checkout/Checkout'))


function Root() {
  return (
    <>
      <div className="flex flex-col" >
        <NavBar />
        <Outlet />

        {/* Modals */}
        <ProfileModal />
        <MealModal />
        <TableDrawer/>
      </div>
    </>
  )
}

function App() {   
  const {isAuth} = useContext(AuthContext)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="order-place" element={<OrderPlace />} />
        <Route path="menu" element={<MenuBoard />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment" element={<Payment/>}/>
        <Route path="add-reviews-by-order-id/:orderId/:guestEmail" element={<AddReviewMeal />} />
        <Route path="orders-history" element={<OrdersHistory/>} />
        
        {/* Public Routes */}
        <Route path="/auth" element={!isAuth ? <Outlet /> : <Navigate to={'/'}/>}>
          <Route index element={<SignIn />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="email-verification/:userId" element={<EmailVerification />} />
        </Route>
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}


        export default App
