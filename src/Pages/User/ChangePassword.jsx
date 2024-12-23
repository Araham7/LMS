import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../../Layout/Layout";
import { changePassword, getUserData } from "../../Redux/Slices/AuthSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* states to change "passwordVisibility" */
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: true,
    newPassword: true,
    confirmNewPassword: true,
  });

  /* function to "passwordVisibility" of password */
  const toggleVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  /* state to hold the states of the "oldPassword" , "newPassword" , "confirmNewPassword" */
  const [changePasswordData, setchangePasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  /* state to "handleInputChange" */
  function handleInputChange(e) {
    const { name, value } = e.target;
    setchangePasswordData({
      ...changePasswordData,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !changePasswordData.oldPassword ||
      !changePasswordData.newPassword ||
      !changePasswordData.confirmNewPassword
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    // Agar "newPassword" aur "confirmNewPassword" same na rahe to error return karo
    if (
      changePasswordData.newPassword !== changePasswordData.confirmNewPassword
    ) {
      toast.error("newPAssword and confirmNewPassword should be equal.");
      return;
    }

    console.log(changePasswordData);
    await dispatch(changePassword(changePasswordData));
    await dispatch(getUserData());

    navigate("/user/profile");
  }

  return (
    <Layout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          data-theme="night"
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
          noValidate
          onSubmit={onFormSubmit}
        >
          <h1 className="text-center text-2xl font-semibold">
            Change Password
          </h1>

          {/* (1). oldPassword Section */}
          <div className="flex flex-col gap-1">
            <label htmlFor="oldPassword" className="text-lg font-semibold">
              Old Password
            </label>
            <div className="relative">
              <input
                required
                name="oldPassword"
                id="oldPassword"
                onChange={handleInputChange}
                placeholder="Enter your Old Password"
                value={changePasswordData.oldPassword}
                type={passwordVisibility.oldPassword ? "password" : "text"}
                className="bg-transparent px-2 py-1 border font-semibold w-full"
              />
              {/* This will toggale the oldPassword's passwordVisibility(with open and close eye) */}
              <button
                type="button"
                onClick={() => toggleVisibility("oldPassword")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-lg"
              >
                {passwordVisibility.oldPassword ? (
                  <AiFillEyeInvisible />
                ) : (
                  <AiFillEye />
                )}
              </button>
            </div>
          </div>

          {/* (2). newPassword Section */}
          <div className="flex flex-col gap-1">
            <label htmlFor="newPassword" className="text-lg font-semibold">
              New Password
            </label>
            <div className="relative">
              <input
                required
                id="newPassword"
                name="newPassword"
                onChange={handleInputChange}
                placeholder="Enter your New Password"
                value={changePasswordData.newPassword}
                type={passwordVisibility.newPassword ? "password" : "text"}
                className="bg-transparent px-2 py-1 border font-semibold w-full"
              />

              {/* This will toggale the newPassword's passwordVisibility(with open and close eye) */}
              <button
                type="button"
                onClick={() => toggleVisibility("newPassword")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-lg"
              >
                {passwordVisibility.newPassword ? (
                  <AiFillEyeInvisible />
                ) : (
                  <AiFillEye />
                )}
              </button>
            </div>
          </div>

          {/* (3). confirmNewPassword Section */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirmNewPassword"
              className="text-lg font-semibold"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                required
                id="confirmNewPassword"
                name="confirmNewPassword"
                onChange={handleInputChange}
                placeholder="Enter your Confirm New Password"
                value={changePasswordData.confirmNewPassword}
                type={
                  passwordVisibility.confirmNewPassword ? "password" : "text"
                }
                className="bg-transparent px-2 py-1 border font-semibold w-full"
              />

              {/* This will toggale the confirmNewPassword's passwordVisibility(with open and close eye) */}
              <button
                type="button"
                onClick={() => toggleVisibility("confirmNewPassword")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-lg"
              >
                {passwordVisibility.confirmNewPassword ? (
                  <AiFillEyeInvisible />
                ) : (
                  <AiFillEye />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer font-semibold"
          >
            Change Password
          </button>

          <Link to="/user/profile">
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2 font-semibold">
              <AiOutlineArrowLeft className="text-lg " /> Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </Layout>
  );
}

export default ChangePassword;
