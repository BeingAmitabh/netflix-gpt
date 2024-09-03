import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(
      email.current.value,
      password.current.value,
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/125256266?v=4"
          }).then(() => {
            const { uid, email, displayname, photoURL } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayname: displayname, photoURL: photoURL }));
            
          }).catch((error) => {
            setErrorMessage(errorMessage);
          });

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode, errorMessage);
        });
    } else {
    
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
         
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode, errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative w-full min-h-screen">
      <Header />
      <img
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={BG_URL}
        alt="Background image"
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 p-8 sm:p-12 bg-black my-36 mx-auto left-0 right-0 top-[10%] rounded-lg bg-opacity-80"
      >
        <h1 className="text-3xl sm:text-4xl font-bold py-4 text-white text-center">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="my-4 p-4 text-white w-full bg-gray-700 rounded-lg"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="my-4 p-4 text-white w-full bg-gray-700 rounded-lg"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="my-4 p-4 text-white w-full bg-gray-700 rounded-lg"
        />
        <p className="text-red-500 font-bold text-lg text-center">{errorMessage}</p>
        <button
          className="my-4 p-4 bg-red-900 text-white font-bold w-full rounded-lg hover:bg-red-800 transition-all duration-200"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          onClick={toggleSignInForm}
          className="text-white text-center cursor-pointer hover:underline"
        >
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already registered? Sign in now"}
          .
        </p>
      </form>
    </div>
  );
};

export default Login;
