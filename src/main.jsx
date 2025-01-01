// Css import
import './index.css';

// library import
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Component import
import App from './App.jsx';
import store from './Redux/store.js';


createRoot(document.getElementById('root')).render(
  // 
  <Provider store={store} > {/* Activating Redux Store in an Entire Application. */}
  <BrowserRouter basename="/LMS" > {/* Activating BrowserRouter in an Entire Application. */}
    <App />
    <Toaster />  {/* This way we can enable the `react-hot-toast` throughout the entire app */}
  </BrowserRouter>
  </Provider>
)

