import React, { useEffect, useState } from "react";
import MainLayout from "../../src/layouts/MainLayout";

import axios from "axios";
import { server } from "../../config/server";
import ProductCart from "../../src/components/ProductCard";
import useGetUserId from "../../hooks/useGetUserId";
import { Iproduct } from "../../interfaces/productInterface";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userReducer";
import { setCart } from "../../redux/slices/cartReducer";
import { setSavedItems } from "../../redux/slices/savedItemsReducer";

function Saved() {
  const decodedToken = useGetUserId();
  const dispatch = useDispatch();
  const { items } = useSelector((store: any) => store.savedItems);
  const { user } = useSelector((store: any) => store.user);

  useEffect(() => {
    if (decodedToken._id && !user.username) {
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

  return (
    <>
      <MainLayout>
        <div className="container mx-auto px-4">
          <div className="w-full flex flex-col items-start gap-2 py-4">
            <h1 className="text-4xl my-4">محصولات موردعلاقه</h1>
            <div className="flex items-center w-full">
              <div className="grid grid-cols-1 px-4 w-full md:grid-cols-6 gap-4">
                {items?.map((p: { product: Iproduct }) => (
                  <ProductCart
                    images={p.product.images}
                    price={p.product.price}
                    title={p.product.name}
                    code={p.product.number}
                    _id={p.product._id}
                    key={p.product._id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Saved;
