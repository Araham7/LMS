import "./App.css";

import { Route, Routes } from "react-router-dom";

import About from "./Pages/About";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";

function App() {
  return (
    <>
    <Routes>

      {/* <Route path="/" element={<Home/>} > </Route> */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} ></Route>
      <Route path="/signup" element={<Signup />} ></Route>
      <Route path="/login" element={<Login />} ></Route>

      {/* Handle 404 Not-Found Page */}
      <Route path="*" element={<NotFound />} />

    </Routes>
    </>
  );
}

export default App;

