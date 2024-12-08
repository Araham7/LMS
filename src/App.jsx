import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
    <Routes>

      {/* <Route path="/" element={<Home/>} > </Route> */}
      <Route path="/" element={<Footer />} />

    </Routes>
    </>
  );
}

export default App;

