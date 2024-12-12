// (1). rfce => This is the shortcut for "React Functional Component".

import { AiFillCloseCircle } from "react-icons/ai";
import { TfiMenuAlt } from "react-icons/tfi";
import { Link } from "react-router-dom";

import Footer from "../Components/Footer.jsx";

function HomeLayout({ children }) {
  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].computedStyleMap.width = "auto";
  };

  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    changeWidth();
  };

  return (
    <div data-theme="luxury" className="min-h-[90vh]  ">
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
          <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative font-extrabold text-[1rem] ">

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

export default HomeLayout;
