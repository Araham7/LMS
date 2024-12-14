// import { sign } from "chart.js/helpers";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail, isValidPassword } from "../Helpers/regexMatcher";
import Layout from "../Layout/Layout";
import { createAccount } from '../Redux/Slices/AuthSlice';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Yanha par humlog upload kiye jane wale image ko ke data ko store karenge.
  const [previewImage, setPreviewImage] = useState("");

  // Yanha par humlog form ke "fullName" , "email" , "password" , "avatar"(i.e, )
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });

  // Ye function input ke data ko "signupData" me object ke form me dalega.
  function handleUserInput(e) {
    const { name, value } = e.target;

    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  // Ye function user ke dwara upload kiye gaye image ko handal karega.
  function getImage(event) {
    event.preventDefault();

    // getting the uploaded-image by the user.
    const uploadedImage =
      event.target
        .files[0]; /* Kyunki humlog single image upload kar rahen hai isili 0th index ko access karenge */

    if (uploadedImage) {
      // Agar "uploadedImage" exist kar rahi hai to ...

      // "setSignupData" ko lekeaayenge aur usme 'avatar' ko set kardenge.
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader(); // Creating fileReader object.
      fileReader.readAsDataURL(uploadedImage); // This will read the uploaded image by the user.

      /* Jayse hi image "load" hojaye us image ko humlog "setPreviewImage" ka use karke "previewImage" me set kardenge. */
      fileReader.addEventListener("load", function () {
        // console.log(this.result); /* This will print the base-64 image text.
        //  */
        setPreviewImage(this.result); // Ise complete hone ke baad me hara dwara upload kiya gaya image server par upload hone se pehle "preview"(dikh) jayega.
      });
    }
  }

  // Handel Clear-form-data :---
  function clearFormData() {
    setSignupData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: "",
    });
    setPreviewImage("");
  }

  // Ye function form ke submission ko handal karega.
  async function createNewAccount(event) {
    event.preventDefault();
    if (
      !signupData.email ||
      !signupData.fullName ||
      !signupData.password ||
      !signupData.avatar ||
      !signupData.confirmPassword
    ) {
      toast.error("Please fill all the detailes!");
      return;
    }

    // checking name field length
    if (signupData.fullName.length < 5) {
      toast("Name should be atleast of 5 characters!");
      return;
    }

    // checking valid email
    if (!isEmail(signupData.email)) {
      toast.error("Invalid email id");
      return;
    }

    // checking password = confirmPassword
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("password and confirmPassword should be same!");
      return;
    }

    // checking password validation
    if (!isValidPassword(signupData.password)) {
      toast.error(
        "Password should be 6 - 16 character long with atleast a number and special character"
      );
      return;
    }
    // createAccount
    // checking password validation
    if (!isValidPassword(signupData.confirmPassword)) {
      toast.error(
        "Password should be 6 - 16 character long with atleast a number and special character"
      );
      return;
    }

    // CreatingForm Data
    const formData = new FormData(); // Creating instance of "FormData".
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("confirmPassword", signupData.confirmPassword);
    formData.append("avatar", signupData.avatar);

    // Convert FormData to an object
    const formDataObject = Object.fromEntries(formData.entries());
    console.log(
      formDataObject
    ); /* This will print all-formData to the console. */

    //
    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) navigate("/"); /* Agar response me backend se success aajata hai to user ko home(/) par redirect kardo */

    /* Agar server se response me success: true aagaya to form ke sare data ko erase kardo */
    setSignupData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: "",
    });
    setPreviewImage("");
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          {/* Form Heading */}
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>

          {/* (i) Image Input */}
          {/* Image Upload Icon */}
          <label
            htmlFor="image_uploads"
            className="cursor-pointer bg-yellow-600 w-20 h-20 rounded-full m-auto"
          >
            {/* If image then display image , else show `BsPersonCircle`(Boot Strap Person Circle) Icon */}
            {previewImage ? (
              <img
                className="w-20 h-20 rounded-full m-auto"
                src={previewImage}
                alt="preview_image" // If wrong image url then show text "preview_image".
              />
            ) : (
              <BsPersonCircle className="w-20 h-20 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={getImage} // Agar image ke input me koi change hoto "getImage" function call hoga.
            className="hidden" // we are hiding this becouse we are opening file using "BsPersonCircle" Icon.
            type="file" // "file" => Becouse we want to take input-file from the user.
            id="image_uploads" // Isme jo "id" hoga usi naam ko label ke htmlfor me daalne se ise indecate karega."aur file input ko open kardega."
            name="image_uploads" // Isi naam se backend me image jayega.
            accept=".jpg, .jpeg, .png, .svg, .webp" // These are the supported input-file extensions type by the user.
          />

          {/* FullName , email , password */}
          {/* (ii). FullName */}
          <div className="flex flex-col gap-1 ">
            <label htmlFor="fullName" className="font-extrabold">
              Name
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter your name..."
              className="bg-transparent px-2 border font-extrabold"
              onChange={handleUserInput}
              value={signupData.fullName}
            />
          </div>

          {/* (iii). email */}
          <div className="flex flex-col gap-1 ">
            <label htmlFor="email" className="font-extrabold">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email..."
              className="bg-transparent px-2 border font-extrabold"
              onChange={handleUserInput}
              value={signupData.email}
            />
          </div>

          {/* (iv). password */}
          <div className="flex flex-col gap-1 ">
            <label htmlFor="password" className="font-extrabold">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter your password..."
              className="bg-transparent px-2 border font-extrabold"
              onChange={handleUserInput}
              value={signupData.password}
            />
          </div>

          {/* (v). confirmPassword */}
          <div className="flex flex-col gap-1 ">
            <label htmlFor="confirmPassword" className="font-extrabold">
              confirmPassword
            </label>
            <input
              type="password"
              required
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Enter your confirmPassword..."
              className="bg-transparent px-2 border font-extrabold"
              onChange={handleUserInput}
              value={signupData.confirmPassword}
            />
          </div>

          {/* (vi). Create Account Button */}
          <div className="flex gap-1">
            {/* (a). Form-reset-button */}
            <button
              type="reset"
              className="btn btn-primary m-auto w-[45%]"
              onClick={clearFormData}
            >
              Clear Form
            </button>

            {/* (b). Submit-button */}
            <button
              type="submit"
              // className="btn btn-warning m-auto w-full"
              className="btn btn-warning m-auto w-[45%]"
            >
              Create Account
            </button>
          </div>

          {/* (vii). Already have an account */}
          <p className="text-center font-extrabold">
            Already have an account ?{" "}
            <Link to="/login" className="link text-accent cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div>
      {/* <h1>SignUp</h1> */}
    </Layout>
  );
}

export default Signup;
