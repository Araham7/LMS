// (1). rfce => This is the shortcut for "React Functional Component".

import { AiFillCloseCircle } from "react-icons/ai";
import { TfiMenuAlt } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../Components/Footer.jsx";

function Layout({ children }) {
  /*
  "useDispatch()" hook is explicitly used in React-Redux to modify store data by dispatching actions. These actions are then processed by reducers, which are responsible for updating the Redux store state based on the action's type and payload. 
  */
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  /*
  "useSelector()" hook in React-Redux is used to retrieve data from the Redux store. It allows you to access the store's state directly in your functional components.
  */
  // for checking if user is loggedIn :---
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  // const isLoggedIn = true;

  // for displaying the options according to the role :---
  const role = useSelector((state) => state?.auth?.role);

  // for data :--
  const data = useSelector((state) => state?.auth?.data);

  // console.log({
    // isLoggedIn,
    // role,
    // data,
  // });

  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].computedStyleMap.width = "auto";
  };

  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    changeWidth();
  };

  const handleLogout = (e) => {
    e.preventDefault();

    // const res = await dispatch(logout);

    // if(res?.payload?.succes)
      navigate("/");
  }


  // drawer-side
  return (
    //  luxury
    <div data-theme="dim" className="min-h-[90vh]  ">
      {/* (1). drawer */}
      <div className="drawer absolute z-50 left-0 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            {/* Menu-Icon */}
            <TfiMenuAlt
              size={"30px"}
              className="font-bold text-white m-4 "
              onClick={() => changeWidth()}
            />
          </label>
        </div>

        {/* Menu-Contents */}
        <div className="drawer-side w-fit">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-100 text-base-content relative font-extrabold text-[1rem] ">
            {/* Sidebar content here */}

            {/* Cancel Button */}
            <li className="w-fit absolute right-2 z-50">
              <button onClick={() => hideDrawer()} className="bg-transparent">
                <AiFillCloseCircle size={"30px"} />
              </button>
            </li>

            {/* Home */}
            <li>
              <Link to="/">Home</Link>
            </li>

            {/* Conditional Rendering based no user login-detailes */}
            {isLoggedIn && role === "ADMIN" && (
              <>
                <li>
                  <Link to="/admin/dashboard">Admin DashBoard</Link>
                </li>
              </>
            )}

            {/* All Courses */}
            <li>
              <Link to="/courses">All Courses</Link>
            </li>

            {/* Contact Us */}
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>

            {/* About Us */}
            <li>
              <Link to="/about">About Us</Link>
            </li>

            {/* Login and signup Button */}
              {!isLoggedIn && (
                // bg-slate-400
            <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex gap-10 items-center justify-center ">
                  <Link to="/login">
                    <button className="btn btn-primary py-1 px-4 font-semibold rounded-md w-full border-2 ">
                      LogIn
                    </button>
                  </Link>

                  <Link to="/signup">
                    <button
                      className="btn btn-secondary py-1 px-4 
                  font-semibold rounded-md w-full border-2 "
                    >
                      SignUp
                    </button>
                  </Link>
                </div>
            </li>
              )}

          {/* profile and Logout Button */}
            {isLoggedIn && (
                // bg-slate-400
            <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex gap-10 items-center justify-center ">
                  <Link to="/user/profile">
                    <button className="btn btn-primary py-1 px-4 font-semibold rounded-md w-full border-2 ">
                      profile
                    </button>
                  </Link>

                  {/* <Link onClick={(e)=> handleLogout(e)} > */}
                  <Link onClick={handleLogout} >
                    <button
                      className="btn btn-secondary py-1 px-4 
                  font-semibold rounded-md w-full border-2 "
                    >
                      LogOut
                    </button>
                  </Link>
                </div>
            </li>
              )}

          </ul>

        </div>
      </div>

      {/* (2). Children-Section */}
      {children}

      {/* (3). Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
