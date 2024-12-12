import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import AuthProvider from './contexts/AuthContext.jsx'


const qoeryCllient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={qoeryCllient}>
    <AuthProvider>
    <App />
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={false}/>
  </QueryClientProvider>
)


axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;