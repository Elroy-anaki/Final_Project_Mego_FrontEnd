import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { MdOutlineTableBar } from "react-icons/md";
import {RestaurantContex} from '../../../contexts/RestaurantContex'

function NavBar() {
  const { isAuth, signOut, user } = useContext(AuthContext);
  const {restaurant} = useContext(RestaurantContex)
  const navigate = useNavigate()

  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800  ">
      <div className="max-w-screen-2xl w-11/12 mx-auto flex justify-between items-center py-5 ">
        {/* Logo and Restaurant Info */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="transition-transform hover:scale-105 flex items-center gap-4"
          >
            <img
              src={restaurant?.restaurantLogo}
              className="h-14 w-auto rounded-full shadow-md"
              alt="Restaurant Logo"
            />
            <div className='flex items-center gap-5'>
              <p className="text-2xl font-bold text-white">
                {isAuth ? `Hi, ${user?.userName}` :restaurant?.restaurantName}
              </p>
            </div>
          </Link>
          <MdOutlineTableBar
            className="text-white cursor-pointer hover:text-orange-500 transition-colors"
            size={42}
          />
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
                      ${isAuth ? ' bg-rose-600 text-white':'bg-gradient-to-r from-orange-700 to-amber-400 text-white'} 
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
              className=" hover:text-white   font-semibold"
            >
              {'Sign Out =>'}
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
