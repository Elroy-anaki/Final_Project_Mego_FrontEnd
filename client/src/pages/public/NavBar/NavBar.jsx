import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { MdOutlineTableBar } from "react-icons/md";
import { RestaurantContex } from '../../../context/RestaurantContex'
import { PiSignOut } from "react-icons/pi";
import { TableContext } from '../../../context/TableContext';


function NavBar() {
  const { isAuth, signOut, user } = useContext(AuthContext);
  const { restaurant } = useContext(RestaurantContex)
  const { tableMeals } = useContext(TableContext)
  const navigate = useNavigate()

  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800  ">
      <div className="max-w-screen-2xl w-11/12 mx-auto flex justify-between items-center py-3 ">
        {/* Logo and Restaurant Info */}
        <div className="flex items-center gap-6 relative">
          <Link
            to="/"
            className="transition-transform hover:scale-105 flex items-center gap-4"
          >
            <img
              loading='lazy'
              src={restaurant?.restaurantLogo}
              className="h-14 w-auto rounded-full shadow-md"
              alt="Restaurant Logo"
            />

          </Link>
          <div className='flex items-center gap-5'>

            {isAuth ? (
              <div className="dropdown relative inline-block text-left">
                <button  
                className="dropdown-button text-2xl bg-gray-50 font-bold text-black rounded-t-lg px-3 py-1 w-full border border-gray-300 shadow-sm cursor-pointer">
                  {user?.userName}
                </button>
                <div className="dropdown-content absolute left-0 bg-gray-50 w-full text-center rounded-b-lg border border-t-0 border-gray-300 shadow-md">
                <button
                    onClick={() => {document.getElementById('profileModal').showModal();}}
                    className="text-base font-bold text-black cursor-pointer py-2  hover:bg-gray-200"
                  >
                    Profile
                  </button>
                  <Link to={"/orders-history"}
                  onClick={() => {
                    document.querySelector('.dropdown-content').classList.add('hidden');
                  }}
                  >
                    <p className="text-base font-bold text-black cursor-pointer py-2 hover:bg-gray-200">
                      Orders
                    </p>
                  </Link>
                  
                </div>
              </div>
            ) : (
              <p className="text-2xl font-bold text-white cursor-pointer">
                {restaurant?.restaurantName}
              </p>
            )}



          </div>
          <div className='absolute top-0 left-[255px] bg-rose-700/80  rounded-xl px-2 py-0.5'>

            <p className=' text-white text-xl '>{tableMeals?.length}</p>
          </div>
          <label htmlFor="tableDrawer" className=""><MdOutlineTableBar
            className="text-white cursor-pointer hover:text-orange-500 transition-colors"
            size={42}
          /></label>


        </div>

        {/* Center Navigation Links */}
        <div id="navbar-sticky" className="absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-8">
            {['Home', 'About', 'Menu', 'Order Place', 'Contact Us'].map((item, index) => (
              <li key={index}>
                <Link
                  to={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="block text-lg py-2 px-4 text-white hover:text-white 
                             font-medium tracking-wide 
                             transition-all duration-300 
                             hover:bg-orange-500 
                             rounded-lg"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Authentication Buttons */}
        <div
          className={`flex items-center gap-4 
                      ${isAuth ? ' bg-rose-600 text-white' : 'bg-gradient-to-r from-orange-700 to-amber-400 text-white'} 
                      rounded-lg 
                      px-4 py-2
                      hover:px-6
                      shadow-md 
                      hover:shadow-lg 
                      transition-all 
                      duration-300`}
        >
          {isAuth ? (

            <button
              onClick={() => {
                signOut()
                navigate('/')

              }}
              className=" hover:text-white flex gap-2 justify-center items-center   font-semibold"
            >
              Sign Out
              <PiSignOut size={20} />

            </button>
          ) : (
            <>
              <Link
                to="/auth/sign-up"
                className="pr-4 border-r 
                hover:text-black 
                         font-semibold 
                         transition-colors"
              >
                Sign Up
              </Link>
              <Link
                to="/auth/sign-in"
                className="
                                           hover:text-black 

                           font-semibold 
                           transition-colors"
              >
                Sign In
              </Link>
            </>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="p-2 w-10 h-10 flex items-center justify-center 
                       text-white
                       rounded-full 
                       hover:bg-orange-300 
                       focus:outline-none 
                       focus:ring-2 
                       focus:ring-orange-400 
                       md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );

}

export default NavBar;
