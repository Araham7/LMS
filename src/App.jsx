import "./App.css";

import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import CourseDescription from "./Pages/Course/CourseDescription";
import CourseList from "./Pages/Course/CourseList";
import CreateCourse from "./Pages/Course/CreateCourse";
import Denied from "./Pages/Denied";
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

        <Route path="/about" element={<About />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/denied" element={<Denied />}></Route>
        <Route path="/courses" element={<CourseList />}></Route>
        <Route path="course/description/" element={<CourseDescription />} ></Route>

        {/* RequireAuth */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />} >
          <Route path="/courses/create" element={<CreateCourse />}></Route>
        </Route>


        {/* Handle 404 Not-Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
