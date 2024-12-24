import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import TableModal from "./modals/TableDrawer/TableDrawer";

// Import Public Pages
const NavBar = lazy(() => import("./pages/public/NavBar/NavBar"));
const Home = lazy(() => import("./pages/public/Home/Home"));
const About = lazy(() => import("./pages/public/About/About"));
const OrderPlace = lazy(() => import("./pages/public/OrderPlace/OrderPlace"));
const MenuBoard = lazy(() => import("./pages/public/Menu/MenuBoard"));

// Import Auth Components
const SignUp = lazy(() => import('./forms/Auth/SingUp/SingUp'));
const SignIn = lazy(() => import('./forms/Auth/SignIn/SignIn'));
import AddReviewMeal from "./forms/Auth/AddReviewMeal/AddReviewMeal";
const ForgotPassword = lazy(() => import("./forms/Auth/ForgotPassword/ForgotPassword"));
const ResetPassword = lazy(()=> import("./forms/Auth/ResetPassword/ResetPassword"))
const EmailVerification = lazy(() => import("./forms/Auth/EmailVerification/EmailVerification"))
const ProfileModal = lazy(() => import("./modals/ProfileModal"));
const MealModal = lazy(() => import('./pages/public/Menu/Modal/MealModal'))
const TableDrawer = lazy(() => import('./modals/TableDrawer/TableDrawer'))




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
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="order-place" element={<OrderPlace />} />
        <Route path="menu" element={<MenuBoard />} />
        
        {/* Public Routes */}
        <Route path="/auth" element={true && <Outlet />}>
          <Route index element={<SignIn />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="email-verification/:userId" element={<EmailVerification />} />
          <Route path="add-reviews-by-order/:userId" element={<AddReviewMeal />} />
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
