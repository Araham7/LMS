import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../../Layout/Layout";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from '../../Redux/Slices/RazorpaySlice';

function Profile() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);
  async function handleCancellation() {
    toast("Initiating cancellation");
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
    toast.success("Cancellation completed!");
    navigate("/");
  }

  return (
    <Layout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div
          data-theme="night"
          className="
        my-10 flex 
        flex-col 
        gap-4 
        rounded-lg 
        p-4 
        text-white 
        w-100 
        shadow-[0_0_10px_black]
        "
        >
          {/* User Image */}
          <img
            src={userData?.avatar?.secure_url}
            className="w-40 m-auto rounded-full border border-black"
          />

          {/* User-fullName */}
          <h3 className="text-3xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>

          <div className="grid grid-cols-2 font-semibold">
            <p>Email: </p>
            <p>{userData?.email}</p>
            <p>Role: </p>
            <p>{userData?.role}</p>
            <p>Subscription: </p>
            <p>
              {userData?.role === "ADMIN"
                ? "Admin Privilege"
                : userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
              {/* { userData?.subscription?.status } */}
            </p>
            {/* {console.log(userData?.subscription?.status)} */}
          </div>

          {/* Change password */}
          <div className="flex items-center justify-between gap-2">
            <Link
              to="/user/changepassword"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              <button>Change password</button>
            </Link>
            <Link
              to="/user/editprofile"
              className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
            >
              <button>Edit profile</button>
            </Link>
          </div>

          {/* Cancel Subscription button */}
          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCancellation}
              className="
              w-full 
              bg-red-600 
              hover:bg-red-500 
              transition-all 
              ease-in-out 
              duration-300
              rounded-sm 
              font-semibold 
              py-2 
              cursor-pointer 
              text-center
              "
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
