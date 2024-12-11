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

        {/* Public Routes */}
        <Route path="auth" element={true && <Outlet />}>
          <Route index element={<NavBar />} />


        </Route>

      </Route>))

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
