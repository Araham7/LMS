import { Link } from "react-router-dom";

import HomePageImage from "../Assets/Images/homePageMainImage.png";
import Layout from "../Layouts/Layout";

function HomePage() {
  return (
    <Layout>
      {/* bg-slate-500  */}
      <div className="pl-20 pt-20 flex flex-row text-white  h-[90vh] ">
        {/* Main-Data */}
        <div className="w-2/3 space-y-6 px-5">
          <h1 className="text-5xl font-semibold">
            Find out best{" "}
            <span className="text-yellow-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-3xl text-gray-200 font-bold">
            We have a large library of courses taught by highly skilled and
            qualified faculities at a very affordable cost.
          </p>

          <div className="space-x-6">
            {/* 1. Explore Courses */}
            <Link to="/cources">
              <button className="bg-yellow-500 px-5 py-3 rounded-md text-lg font-semibold cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                Explore Courses
              </button>
            </Link>

            {/* 2. Contact Us */}
            <Link to="/contact">
              <button className="border border-yellow-500 px-5 py-3 rounded-md text-lg font-semibold cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* Image-background */}
        <div className="w-1/3 flex items-center justify-center">
          <img alt="homepage image" src={HomePageImage} />
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
