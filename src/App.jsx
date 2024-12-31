import "./App.css";

import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import CourseDescription from "./Pages/Course/CourseDescription";
import CourseList from "./Pages/Course/CourseList";
import CreateCourse from "./Pages/Course/CreateCourse";
import AddLecture from "./Pages/Dashboard/AddLecture";
import Displaylectures from './Pages/Dashboard/Displaylectures';
import Denied from "./Pages/Denied";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Checkout from "./Pages/Payments/Checkout";
import CheckoutFailure from "./Pages/Payments/CheckoutFailure";
import CheckoutSuccess from './Pages/Payments/CheckoutSuccess';
import Signup from "./Pages/Signup";
import ChangePassword from "./Pages/User/ChangePassword";
import EditProfile from "./Pages/User/EditProfile";
import Profile from "./Pages/User/Profile";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        
      {/* Common routes for every person. */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/denied" element={<Denied />}></Route>
        
        
        {/* RequireAuth: Routes for "ADMIN" only. */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/courses/create" element={<CreateCourse />}></Route>
          <Route path="/course/addlecture" element={<AddLecture />}></Route>
          <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        </Route>


        {/* RequireAuth: Routes for "ADMIN" & "USER" only. */}
        <Route element={<RequireAuth allowedRoles={["ADMIN" , "USER"]} />}>
          <Route path="/about" element={<About />}></Route>
          <Route path="/user/profile" element={<Profile />}></Route>
          <Route path="/user/editprofile" element={<EditProfile />}></Route>
          <Route path="/user/changepassword" element={<ChangePassword />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/checkout/success" element={<CheckoutSuccess />}></Route>
          <Route path="/checkout/fail" element={<CheckoutFailure />}></Route>
          <Route path="/course/displaylectures" element={<Displaylectures />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/courses" element={<CourseList />}></Route>
          <Route  path="course/description/" element={<CourseDescription />}></Route>
        </Route>


        {/* Route to handal: 404 Not-Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
