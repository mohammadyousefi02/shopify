import React, { useEffect } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { server } from "../config/server";
import { setCart } from "../redux/slices/cartReducer";
import { setSavedItems } from "../redux/slices/savedItemsReducer";
import { setUser } from "../redux/slices/userReducer";
import useGetUserId from "./useGetUserId";

function useGetUserData(secondCondition: boolean = true) {
  const { user } = useSelector((store: any) => store.user);
  const decodedToken = useGetUserId();
  const dispatch = useDispatch();
  const addSecondCondition = () => (secondCondition ? !user.username : true);
  useEffect(() => {
    if (decodedToken._id && addSecondCondition()) {
      axios
        .get(`${server}/api/users/${decodedToken._id}`)
        .then((res) => {
          const { username, email, _id, cart, saved } = res.data;
          dispatch(setUser({ user: { username, email, _id } }));
          dispatch(setCart({ items: cart.items }));
          dispatch(setSavedItems({ items: saved.items }));
        })
        .catch((e) => console.log(e));
    }
  }, []);
}

export default useGetUserData;
