import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import axiosInstance from "../Helpers/axiosInstance";
import { isEmail } from '../Helpers/regexMatcher';
import Layout from "../Layout/Layout";

function Contact() {

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn);
  

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };


  /* Yanha par humlog form ke submit ke baad data ko backend me bhejenge without using "dispatch()" metdhod kyuki ise hame redux-store me save/store nahi karna hai. */
  async function onFormSubmit(e) {
    e.preventDefault();

    if(!userInput.email || !userInput.name || !userInput.message ) {
        toast.error("All fields are mandatory!");
        return;
    }

    if(!isEmail(userInput.email)) {
        toast.error("Invalid email");
        return;
    }

    if(!isLoggedIn){
      toast.error("Please Login to Submit the form.");
      navigate('/login'); // Redirects to /login
      return;
    }

    try {
        const response = axiosInstance.post("/users/contact", userInput);
        toast.promise(response, {
            loading: "Submitting your message...",
            success: "Form submitted successfully!",
            error: "Failed to submit the form!"
        });
        const contactResponse = await response;
        console.log(contactResponse)
        if(contactResponse?.data?.success) {
            setUserInput({
                name: "",
                email: "",
                message: "",
            });
        }
    } catch (err) {
        toast.error("operation failed....",);
        console.log(err.message);
        
    }

}

  return (
    <Layout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
        onSubmit={onFormSubmit}
          noValidate
          data-theme="night"
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem] "
        >
          {/* (1). Contact-Form-Heading */}
          <h1 className="text-3xl font-extrabold">Contact Form</h1>

          {/* (2). Name */}
          <div
            className="flex flex-col w-full gap-1 justify-center
            "
            // items-center
          >
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              onChange={handleInputChange}
              className="bg-transparent border px-2 font-semibold"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name..."
              value={userInput.name}
            />
          </div>

          {/* (3). Email */}
          <div
            className="flex flex-col w-full gap-1 justify-center
            "
            // items-center
          >
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <input
              onChange={handleInputChange}
              className="bg-transparent border px-2 font-semibold"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
              value={userInput.email}
            />
          </div>

          {/* (4). Message */}
          <div
            className="flex flex-col w-full gap-1 justify-center
            "
            // items-center
          >
            <label htmlFor="message" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              onChange={handleInputChange}
              className="bg-transparent border px-2 font-semibold resize-none h-40"
              name="message"
              id="message"
              placeholder="Enter your message..."
              value={userInput.message}
            />
          </div>

          {/* (5). Form-submit-button */}
          <div className="flex gap-1">
            <button
              type="submit"
              className="btn btn-primary w-60"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Contact;
