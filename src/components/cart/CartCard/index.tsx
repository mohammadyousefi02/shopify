import axios, { AxiosError } from "axios";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../../../config/server";
import useAuthUserToken from "../../../../hooks/useAuthUserToken";

import { MdDelete, BiPlus, BiMinus } from "../../../../icons";
import {
  addToCart,
  decreaseItemQuantity,
  removeFromCart,
  setCart,
} from "../../../../redux/slices/cartReducer";

import { toast } from "react-toastify";
import Link from "next/link";

interface Props {
  images: string[];
  name: string;
  color: string;
  size: string;
  code: number;
  price: string;
  quantity: number;
  _id: string;
}

function CartCard({
  images,
  name,
  code,
  color,
  size,
  price,
  quantity,
  _id,
}: Props) {
  const [token] = useAuthUserToken();

  const dispatch = useDispatch();
  const { items } = useSelector((store: any) => store.cart);
  const increaseQuantity = async () => {
    const copyCartItems = [...items];
    dispatch(
      addToCart({
        item: { color, size, product: { images, name, price, _id } },
      })
    );
    try {
      await axios.post(
        `${server}/api/add-to-cart/${_id}`,
        { size, color },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
    } catch (error) {
      const err = error as AxiosError;
      const errText = err.response?.data as { error: string };
      if (errText.error === "تعداد محصول وارد شده بیشتر از حد موجود است") {
        toast.error(errText.error);
      } else {
        toast.error("خطایی در اضافه کردن پیش آمده");
      }
      dispatch(setCart({ items: copyCartItems }));
    }
  };

  const decreaseQuantity = async () => {
    const copyCartItems = [...items];
    dispatch(decreaseItemQuantity({ _id, color, size }));
    try {
      await axios.post(
        `${server}/api/decrease-item-quantity/${_id}`,
        { size, color },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
    } catch (error) {
      toast.error("خطایی در کم کردن پیش آمده");
      dispatch(setCart({ items: copyCartItems }));
    }
  };

  const removeFromCartHandler = async () => {
    const copyCartItems = [...items];
    dispatch(removeFromCart({ _id, color, size }));
    try {
      await axios.post(
        `${server}/api/remove-from-cart/${_id}`,
        { size, color },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
    } catch (error) {
      toast.error("خطایی در حذف کردن پیش آمده");
      dispatch(setCart({ items: copyCartItems }));
    }
  };

  return (
    <tr>
      <td>
        <div className="flex items-center gap-2">
          <Image
            src={images[0]}
            className="rounded"
            alt=""
            width={75}
            height={75}
          />
          <Link href={`/products/${code}/${name.split(" ").join("-")}`}>
            <a>
              <span className="text-primary">
                {name} - {code} - {color} - {size}
              </span>
            </a>
          </Link>
        </div>
      </td>
      <td className="align-middle">
        <span>{Number(price).toLocaleString("fa")}</span>
      </td>
      <td className="align-middle">
        <div className="flex items-center gap-3">
          <div
            onClick={decreaseQuantity}
            className="bg-primary text-white p-1 rounded-full cursor-pointer"
          >
            <BiMinus fontSize={16} />
          </div>
          <span>{quantity.toLocaleString("fa")}</span>
          <div
            onClick={increaseQuantity}
            className="bg-primary text-white p-1 rounded-full cursor-pointer"
          >
            <BiPlus fontSize={16} />
          </div>
        </div>
      </td>
      <td className="align-middle">
        {(Number(price) * quantity).toLocaleString("fa")}
      </td>
      <td className="align-middle">
        <div
          className="bg-primary rounded p-1 inline-block cursor-pointer"
          onClick={removeFromCartHandler}
        >
          <MdDelete fontSize={16} color="#fff" />
        </div>
      </td>
    </tr>
  );
}

export default CartCard;
