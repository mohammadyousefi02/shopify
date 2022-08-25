import React, { useEffect, useState } from "react";
import Button from "../../Button";

import _ from "lodash";
import { useSelector } from "react-redux";
import { IcartItem } from "../../../../interfaces/cartInterface";
import Link from "next/link";
import Input from "../../Input";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../../../config/server";
import useAuthUserToken from "../../../../hooks/useAuthUserToken";

interface Props {
  onClick?: React.MouseEventHandler | boolean;
  discountField?: boolean;
}
function TotalPriceSection({ onClick = false, discountField = false }: Props) {
  const [token] = useAuthUserToken();
  const [showDiscountCode, setShowDiscountCode] = React.useState(false);
  const [productPrices, setProductPrices] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const { items } = useSelector((store: any) => store.cart);

  const [discountCode, setDiscountCode] = useState("");

  const setDiscountHandler = async () => {
    if (discountCode) {
      try {
        const res = await axios.post(
          `${server}/api/set-discount`,
          { code: discountCode },
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        const discountPrice = productPrices * (res.data / 100);
        setDiscount(discountPrice);
        setTotalPrice(productPrices - discountPrice);
      } catch (error) {
        toast.error("کد تخفیف وارد شده صحیح نمی باشد");
      }
    } else {
      toast.error("کد تخفیف را وارد کنید");
    }
  };

  useEffect(() => {
    const total = _.sumBy(items, (item: IcartItem) => {
      return Number(item.product.price) * item.quantity;
    });
    setProductPrices(total);
    setTotalPrice(total);
  }, [items]);
  return (
    <div className="bg-[#56B261] rounded shadow bg-opacity-80 p-2 w-full sm:w-[400px]">
      <h1 className="py-2 text-white text-center font-bold">
        مجموع کل سبد خرید
      </h1>
      <div className="bg-white rounded">
        <div className="border-b border-gray border-opacity-50 p-4 flex w-full">
          <h5 className="self-start pl-20">قیمت کل :</h5>
          <h5 className=" text-primary font-bold">
            {productPrices.toLocaleString("fa")}
          </h5>
        </div>
        <div className="border-b border-gray border-opacity-50 p-4 py-8 flex w-full">
          <span className="pl-20"> حمل و نقل :</span>
          <span className="text-[#1E7E34] font-bold">
            {(30000).toLocaleString("fa")}
          </span>
        </div>
        {discountField && (
          <div className="border-b border-gray border-opacity-50 p-4 py-8 flex w-full">
            <span className="pl-20"> تخفیف :</span>
            <span className="text-[#1E7E34] font-bold">
              {discount.toLocaleString("fa")}
            </span>
          </div>
        )}
        <div className=" p-4 py-8 flex w-full">
          <span className="pl-20"> مجموع :</span>
          <span className="text-primary font-bold">
            {(totalPrice + 30000).toLocaleString("fa")}
          </span>
        </div>
      </div>
      {discountField && (
        <h1
          className="text-sm my-2 cursor-pointer"
          onClick={() => setShowDiscountCode(!showDiscountCode)}
        >
          وارد کردن کد تخفیف
        </h1>
      )}
      {showDiscountCode && (
        <div className="fade-in">
          <Input
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <Button title="تایید" className="mt-2" onClick={setDiscountHandler} />
        </div>
      )}
      {!onClick ? (
        <Link href="/payment-info">
          <a>
            <Button className="mt-2 w-full" title="اقدام به پرداخت" />
          </a>
        </Link>
      ) : (
        <Button
          className="mt-2 w-full"
          title="پرداخت"
          onClick={onClick as React.MouseEventHandler}
        />
        )}
    </div>
  );
}

export default TotalPriceSection;
