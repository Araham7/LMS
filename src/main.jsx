// Css import
import './index.css';

// Component import
import App from './App.jsx';

// library import
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Toaster />  {/* This way we can enable the `react-hot-toast` throughout the entire app */}
  </BrowserRouter>
)

