import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IcartItem } from "../../../../interfaces/cartInterface";
import { Iproduct } from "../../../../interfaces/productInterface";
import CartCard from "../CartCard";
import { emptyCart, setCart } from "../../../../redux/slices/cartReducer"
import useAuthUserToken from "../../../../hooks/useAuthUserToken";
import axios from "axios";
import { server } from "../../../../config/server";
import { toast } from "react-toastify";

function CartTable() {
  const dispatch = useDispatch()
  const [ token ] = useAuthUserToken()
  const emptyCartHandler = async() => {
      const copyCartItems = [...items];
      dispatch(emptyCart());
      try {
        await axios.post(`${server}/api/empty-cart/`,null,{headers: {
              "x-auth-token": token,
            },
          }
        );
      } catch (error) {
        toast.error("خطایی در خالی کردن سبد خرید پیش آمده");
        dispatch(setCart({ items: copyCartItems }));
      }
  }
  const { items } = useSelector((store: any) => store.cart);
  return (
    <div className="flex flex-col flex-1">
      <div className="border rounded flex-1">
      <table className="w-full">
        <thead>
          <tr>
            <th>محصول</th>
            <th>قیمت</th>
            <th>تعداد</th>
            <th>قیمت کل</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((p: IcartItem) => (
            <CartCard
              key={p._id}
              code={p.product.number}
              color={p.color}
              size={p.size}
              _id={p.product._id}
              images={p.product.images}
              name={p.product.name}
              price={p.product.price}
              quantity={p.quantity}
            />
          ))}
        </tbody>
      </table>
    </div>
    <button className="bg-primary self-start text-white p-1 rounded my-1 text-[12px]" onClick={emptyCartHandler}>خالی کردن سبد خرید</button>
    </div>
  );
}

export default CartTable;
