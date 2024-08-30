import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice"

const Body = () => {
  const dispatch = useDispatch();
  let appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayname , photoURL} = user;
        dispatch(addUser({ uid: uid, email: email, displayname: displayname, photoURL:photoURL }));
      } else {
        dispatch(removeUser());
      }
    });
  }, [])
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
