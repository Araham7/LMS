import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../Layout/Layout";
import { login } from '../Redux/Slices/AuthSlice';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  //   Is state me login-form ke sare data ko rakha jayega.
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  //   Jab bhi form ke kisi field me koi bhi changes(event) hoti hai to use humlog "handleUserInput" function se handle karenge.
  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  //   "onLogin" : This function(onLogin) will executes when user click on "LogIn-button".
  async function onLogin(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    console.log(loginData);

    /* dispatch create account action */
    const response = await dispatch(login(loginData));

    // Agar backend se response me success aajata hai to homeRoute("/") par user ko redirect kardo.
    if (response?.payload?.success) navigate("/");

    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <Layout>
      <div className="flex overflow-x-auto items-center justify-center h-[90vh]">
        <form
          data-theme="night"
          noValidate
          onSubmit={onLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Login Page</h1>

          {/* (i). Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-extrabold">
              {" "}
              Email{" "}
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email.."
              className="bg-transparent px-2 py-1 border font-extrabold"
              onChange={handleUserInput}
              value={loginData.email}
            />
          </div>

          {/* (ii). Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-extrabold">
              {" "}
              Password{" "}
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter your password.."
              className="bg-transparent px-2 py-1 border font-extrabold"
              onChange={handleUserInput}
              value={loginData.password}
            />
          </div>

          {/* (iii). Login Button */}
          <div className="flex gap-1">
            {/* (a). LogIn-Submit-Button */}
            <button
              type="submit"
              className="btn btn-primary m-auto w-[90%]  text-lg "
              // onClick={clearFormData}
            >
              Login
            </button>
          </div>

          {/* (iv). Signup-Link */}
          <p className="text-center font-extrabold">
            Donot hanve an account ?{" "}
            <Link to="/signup" className="link text-accent cursor-pointer font-extrabold ">
              {" "}
              Signup
            </Link>
          </p>

        </form>
      </div>
    </Layout>
  );
}

export default Signup;
