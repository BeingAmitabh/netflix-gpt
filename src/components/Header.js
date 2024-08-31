import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_AVTAR } from "../utils/constant";

const Header = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
   const unsubscribe= onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayname, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayname: displayname, photoURL: photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return ()=> unsubscribe();
  }, [])

  return (
    <div className="w-full flex items-center justify-between px-8 py-2 bg-gradient-to-b from-black z-20 fixed">

      <img
        className="w-44"
        src={LOGO}
        alt="Netflix logo"
      />


      {user && (<div className="flex items-center space-x-4 ">
        <img
          className="w-12 h-12 rounded-full"
          src={USER_AVTAR || user?.photoURL}
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
