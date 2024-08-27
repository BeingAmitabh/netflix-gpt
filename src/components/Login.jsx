import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState("true");
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <img
        className="absolute"
        src=" https://assets.nflxext.com/ffe/siteui/vlv3/36a4db5b-dec2-458a-a1c0-662fa60e7473/1115a02b-3062-4dcc-aae0-94028a0dcdff/IN-en-20240820-TRIFECTA-perspective_WEB_eeff8a6e-0384-4791-a703-31368aeac39f_small.jpg"
        alt="Background image"
      />
      <form className="absolute w-3/12 p-12  bg-black my-36 mx-auto left-0 right-0 rounded-lg bg-opacity-80">
        <h1 className="text-3xl font-bold py-4 text-white">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <input
          type="text"
          placeholder="Email Address"
          className="my-4 p-4 text-white w-full bg-gray-700 "
        />
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="my-4 p-4 text-white w-full bg-gray-700 "
          />
        )}
        <input
          type="password"
          placeholder="Password"
          className="my-4 p-4 text-white w-full bg-gray-700"
        />
        <button className="my-4 p-4 bg-red-900 text-white font-bold w-full rounded-lg">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p onClick={toggleSignInForm} className="text-white cursor-pointer">
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already registered? Sign in now"}
          .
        </p>
        {/* <p className="text-white ">
        New to Netflix?<span onClick={toggleSignInForm} className="cursor-pointer underline"><b>Sign up now</b></span>
        </p> */}
      </form>
    </div>
  );
};

export default Login;
