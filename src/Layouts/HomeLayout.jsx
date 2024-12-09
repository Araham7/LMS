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
    <div className="min-h-[90vh]">
      {/* (1). drawer */}
      <div className="drawer absolute left-0 z-50 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            {/* Menu-Icon */}
            <TfiMenuAlt
              size={"30px"}
              className="font-bold text-blue-800 m-4 "
              onClick={() => changeWidth()}
            />
          </label>
        </div>

        {/* Menu-Contents */}
        <div className="drawer-side w-fit">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative font-extrabold text-[1rem] ">
            {/* Sidebar content here */}
            <li className="w-fit absolute right-2 z-50">
              <button onClick={() => hideDrawer()} className="bg-transparent">
                <AiFillCloseCircle size={"30px"} />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/programs">Programs Offered</Link>
            </li>
            <li>
              <Link to="/schedule">Class Schedule</Link>
            </li>
            <li>
              <Link to="/Instructors">Instructors</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/enroll">Join Us / Enrollment</Link>
            </li>
            <li>
              <Link to="/events">Events & Competitions</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/shop">Shop / Merchandise</Link>
            </li>
            <li>
              <Link to="/testimonials">Testimonials & Achievements</Link>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
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
