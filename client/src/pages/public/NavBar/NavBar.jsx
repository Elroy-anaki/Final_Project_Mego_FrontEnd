import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { MdOutlineTableBar } from "react-icons/md";


function NavBar() {
  const { isAuth, signOut } = useContext(AuthContext);

  return (
    <nav className="w-full bg-gradient-to-r from-rose-50 to-gray-50 shadow-md">
      <div className="max-w-screen-2xl w-11/12 mx-auto flex justify-between items-center py-4">
      <div className='flex justify-center gap-5'>
      <Link to="/" className="transition-transform hover:scale-105">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-10 w-auto"
            alt="Flowbite Logo"
          />
        </Link>
      <MdOutlineTableBar className='text-orange-500 cursor-pointer' size={42} />
      </div>

        

        <div id="navbar-sticky" className="absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex justify-center gap-4">
            <li>
              <Link
                to={'/home'}
                className="block text-xl py-2 px-3 text-rose-600 hover:text-rose-800 
                         font-medium tracking-wide 
                         transition-all duration-300 
                         hover:bg-rose-100/50 
                         rounded-md"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={'/about'}
                className="block text-xl py-2 px-3 text-rose-600 hover:text-rose-800 
                         font-medium tracking-wide 
                         transition-all duration-300 
                         hover:bg-rose-100/50 
                         rounded-md"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to={'/menu'}
                className="block text-xl py-2 px-3 text-rose-600 hover:text-rose-800 
                         font-medium tracking-wide 
                         transition-all duration-300 
                         hover:bg-rose-100/50 
                         rounded-md"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                to={'/'}
                className="block text-xl py-2 px-3 text-rose-600 hover:text-rose-800 
                         font-medium tracking-wide 
                         transition-all duration-300 
                         hover:bg-rose-100/50 
                         rounded-md"
              >
                Order Place
              </Link>
            </li>
            <li>
              <Link
                to={'/'}
                className="block text-xl py-2 px-3 text-rose-600 hover:text-rose-800 
                         font-medium tracking-wide 
                         transition-all duration-300 
                         hover:bg-rose-100/50 
                         rounded-md"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div
          className="flex justify-between items-center 
                      bg-gradient-to-br from-rose-100 to-gray-100 
                      border border-rose-200 
                      rounded-xl
                      px-4 py-2 
                      shadow-sm 
                      hover:shadow-md 
                      transition-all 
                      duration-300"
        >

          <div className='flex items-center'>

            {isAuth ? (
              <button
                onClick={signOut}
                className="text-rose-700 hover:text-rose-900 font-semibold"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to={'/auth/sign-up'}
                  className="pr-3 mr-3 border-r border-rose-300 
                       text-rose-700 
                       hover:text-rose-900 
                       font-semibold 
                       transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  to={'/auth/sign-in'}
                  className="mr-2 text-gray-700 
                         hover:text-rose-700 
                         font-semibold 
                         transition-colors"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center 
                     text-sm text-rose-500 
                     rounded-full 
                     hover:bg-rose-100 
                     focus:outline-none 
                     focus:ring-2 
                     focus:ring-rose-200 
                     md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
