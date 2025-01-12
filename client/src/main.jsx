import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import AuthProvider from './Contexts/AuthContext.jsx'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <PayPalScriptProvider options={{ clientId: "AQo7NVIVKw_tJ_SYLk3Dk7hjiejm6uaAy91uyPHfP7VyjLB8OalqpFfoWCjWy0ZoQFRGS8rRq8BsB9Os" , intent:"capture" , currency:"ILS"}}>

          <AuthProvider>
          <ToastContainer />
              <App />
          </AuthProvider>
          </PayPalScriptProvider>

      <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);


axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;