import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { ShopProvider } from './contexts/ShopContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ShopProvider>
        <App />
      </ShopProvider>
    </AuthProvider>
  </StrictMode>,
)
