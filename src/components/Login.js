import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState("true");
  const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate();
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
      //sign UP
      createUserWithEmailAndPassword(auth, email.current.value,
        password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/125256266?v=4"
          }).then(() => {
            const { uid, email, displayname , photoURL} = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayname: displayname, photoURL: photoURL }));
            // navigate("/browse");
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
      // sign In
      signInWithEmailAndPassword(auth, email.current.value,
        password.current.value,)
        .then((userCredential) => {
          const user = userCredential.user;
          // navigate("/browse");
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
    <div>
      <Header />
      <img
        className="absolute"
        src=" https://assets.nflxext.com/ffe/siteui/vlv3/36a4db5b-dec2-458a-a1c0-662fa60e7473/1115a02b-3062-4dcc-aae0-94028a0dcdff/IN-en-20240820-TRIFECTA-perspective_WEB_eeff8a6e-0384-4791-a703-31368aeac39f_small.jpg"
        alt="Background image"
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 p-12  bg-black my-36 mx-auto left-0 right-0 rounded-lg bg-opacity-80"
      >
        <h1 className="text-3xl font-bold py-4 text-white">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="my-4 p-4 text-white w-full bg-gray-700 "
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="my-4 p-4 text-white w-full bg-gray-700 "
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="my-4 p-4 text-white w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg">{errorMessage}</p>
        <button
          className="my-4 p-4 bg-red-900 text-white font-bold w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p onClick={toggleSignInForm} className="text-white cursor-pointer">
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
