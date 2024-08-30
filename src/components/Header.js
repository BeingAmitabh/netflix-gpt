import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="w-full flex items-center justify-between px-8 py-2 bg-gradient-to-b from-black z-20 fixed">

      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix logo"
      />


      {user && (<div className="flex items-center space-x-4 ">
        <img
          className="w-12 h-12 rounded-full"
          src={user?.photoURL || "https://i.pinimg.com/474x/d7/19/6a/d7196adc7c4f353d52235c5e6ed12e65.jpg"}
          alt="smiley icon"
        />
        <button
          className="font-bold text-white"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
      )}
    </div>
  );
};

export default Header;
