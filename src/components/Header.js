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
import { toggleGptSearchView } from "../utils/gptslice";
import { SUPPORTED_LANGUAGES } from "../utils/constant";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayname, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayname: displayname, photoURL: photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [])

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  }
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }
 
  return (
    <div className="w-full flex items-center justify-between px-8 py-2 bg-gradient-to-b from-black z-20 fixed">

      <img
        className="w-44"
        src={LOGO}
        alt="Netflix logo"
      />

      {user && (<div className="flex items-center space-x-4 ">
        {showGptSearch && (<select className="p-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
          ))}
        </select>
        )}
        
        <button className="text-white bg-purple-500 px-4 py-2 mx-4 my-4 rounded-lg" onClick={handleGptSearchClick}>GPT search</button>
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
