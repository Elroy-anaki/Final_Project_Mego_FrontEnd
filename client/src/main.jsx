import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import AuthProvider from './context/AuthContext.jsx';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <PayPalScriptProvider options={{ clientId: paypalClientId, intent: "capture", currency: "ILS" }}>
      <AuthProvider>
        <ToastContainer />
        <App />
      </AuthProvider>
    </PayPalScriptProvider>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL_DEV;
axios.defaults.withCredentials = true;
