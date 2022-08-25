import axios, { AxiosError } from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { server } from "../../../config/server";
import useAuthUserToken from "../../../hooks/useAuthUserToken";
import Button from "../Button";
import Select from "react-select";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setCart, addToCart } from "../../../redux/slices/cartReducer";
import { v4 as uuidv4 } from "uuid";
import { Isize } from "../../../interfaces/productInterface";
import {
  FiChevronLeft,
  BsStarFill,
  BsStarHalf,
  TiPencil,
} from "../../../icons";

import { toast } from "react-toastify";

interface Props {
  images: string[];
  title: string;
  price: string;
  _id: string;
  sizes: Isize[];
  code: number;
  category: string;
  star: string;
}

function ProductDetail({
  images,
  title,
  price,
  _id,
  sizes,
  code,
  category,
  star,
}: Props) {
  const dispatch = useDispatch();

  interface Ioption {
    label: string;
    value: string;
  }

  const { items } = useSelector((store: any) => store.cart);
  const [sizeOptions, setSizeOptions] = useState<Ioption[]>([]);
  const [colorOptions, setColorOptions] = useState<Ioption[]>([]);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [sizeSelectInpValue, setSizeSelectInpValue] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [colorSelectInpValue, setColorSelectInpValue] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [token] = useAuthUserToken();
  useEffect(() => {
    setImage(images[0]);
    const copySizeOptions: Ioption[] = [];
    sizes.forEach((s) => {
      copySizeOptions.push({ value: s.size, label: s.size });
    });
    setSizeOptions(copySizeOptions);
    setSize("");
    setColor("");
    setQuantity(0);
    setSizeSelectInpValue(null);
    setColorSelectInpValue(null);
  }, [router.query.slug]);

  useEffect(() => {
    const chosenSize = sizes.find((s) => s.size === size);
    setQuantity(chosenSize?.quantity || 0);
    const colorOptions: Ioption[] = [];
    chosenSize?.colors.forEach((c) => {
      colorOptions.push({ value: c, label: c });
    });
    setColorOptions(colorOptions);
  }, [size]);

  const addToCartHandler = async () => {
    if (token) {
      if (size && color) {
        const copyCartItems = [...items];
        dispatch(
          addToCart({
            item: {
              _id: uuidv4(),
              color,
              size,
              product: { images, name: title, price, _id },
            },
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
      } else toast.error("سایز و رنگ را انتخاب کنید");
    } else {
      router.push("/profile");
    }
  };

  return (
    <div className="bg-white flex flex-col md:flex-row gap-2 rounded-lg p-3">
      <div className="flex flex-[0.5] border border-gray border-opacity-50 p-1 flex-col gap-3 items-center">
        <div className="relative w-full h-[450px]">
          <Image
            src={image || images[0]}
            layout="fill"
            objectFit="cover"
            alt="title"
          />
        </div>
        <div className="flex gap-2 self-start">
          {images.map((i) => (
            <Image
              key={i}
              onClick={() => setImage(i)}
              src={i}
              width={55}
              height={55}
              alt={""}
              className="rounded-lg cursor-pointer"
            />
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-[20px] pb-1 w-full border-b mt-4">
          <FiChevronLeft className="text-primary" />
          <h1>{title}</h1>
        </div>
        <div className="flex w-full mt-4">
          <div className="flex-1 flex gap-2">
            <span>کد محصول:</span>
            <span className="text-primary">{code}</span>
          </div>
          <div className="flex-1 flex gap-2">
            <span>دسته بندی:</span>
            <span className="text-primary">{category}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 text-primary text-[24px]">
          <h1>{Number(price).toLocaleString("fa")} تومان</h1>
          <div className="flex items-center gap-2 font-bold px-6">
            <span>{Number(star).toLocaleString("fa")}</span>
            <BsStarFill className="text-yellow-400" />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="max-w-[300px] flex flex-col gap-2">
            <label htmlFor="">انتخاب سایز:</label>
            <Select
              onChange={(value) => {
                setSize(value!.value);
                setSizeSelectInpValue(value);
              }}
              options={sizeOptions}
              value={sizeSelectInpValue}
            />
          </div>
          <div className="max-w-[300px] flex flex-col gap-2">
            <label htmlFor="">انتخاب رنگ:</label>
            <Select
              onChange={(value) => {
                setColor(value!.value);
                setColorSelectInpValue(value);
              }}
              options={colorOptions}
              value={colorSelectInpValue}
            />
          </div>
          {size ? <p>{quantity} در انبار</p> : <p>یک سایز را انتخاب کنید</p>}
        </div>
        <div className="mt-4">
          <Button
            title="افزودن به سبد خرید"
            onClick={addToCartHandler}
            disbale={!quantity ? true : false}
            color="pink"
            className={`py-3 w-full ${!quantity && "bg-opacity-40"}`}
            rounded="normal"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
