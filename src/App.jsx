import "./App.css";

import { Route, Routes } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <>
    <Routes>

      {/* <Route path="/" element={<Home/>} > </Route> */}
      <Route path="/" element={<HomePage />} />

      {/* Handle 404 Not-Found Page */}
      <Route path="*" element={<NotFound />} />

    </Routes>
    </>
  );
}

export default App;

