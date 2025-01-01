// Css import
import './index.css';

// library import
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';  // Use HashRouter instead of BrowserRouter to avoid 404 on page refresh in GitHub Pages.

// Component import
import App from './App.jsx';
import store from './Redux/store.js';


createRoot(document.getElementById('root')).render(
  // 
  <Provider store={store} > {/* Activating Redux Store in an Entire Application. */}
{/* <BrowserRouter basename="/LMS" >  Activating BrowserRouter in an Entire Application(ye ```basename="/LMS" ``` props dal ne se github par deployed webpage work to karega magar refresh karnese problem karega isse bachne keliye "BrowserRouter" ke jagha par "HashRouter" ka use karo). */}
  <HashRouter> {/* Activating HashRouter in an Entire Application(To resolve runtime github refresh problem.). */}
    <App />
    <Toaster />  {/* This way we can enable the `react-hot-toast` throughout the entire app */}
  </HashRouter>
  {/* </BrowserRouter> */}
  </Provider>
)

