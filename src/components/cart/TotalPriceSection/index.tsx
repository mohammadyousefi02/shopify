import React, { useEffect, useState } from "react";
import Button from "../../Button";

import _ from "lodash";
import { useSelector } from "react-redux";
import { IcartItem } from "../../../../interfaces/cartInterface";

function TotalPriceSection() {
  const [totalPrice, setTotalPrice] = useState(0)
  const { items } = useSelector((store: any) => store.cart);

  useEffect(()=>{
    const total = _.sumBy(items, (item:IcartItem) => {
      return Number(item.product.price) * item.quantity;
    });
    setTotalPrice(total)
  },[items])
  return (
    <div className="bg-[#56B261] rounded shadow bg-opacity-80 p-2  w-[400px]">
      <h1 className="py-2 text-white text-center font-bold">مجموع کل سبد خرید</h1>
      <div className="bg-white rounded">
        <div className="border-b border-gray border-opacity-50 p-4 flex w-full">
          <h5 className="self-start pl-20">قیمت کل :</h5>
          <h5 className=" text-primary font-bold">{totalPrice.toLocaleString("fa")}</h5>
        </div>
        <div className="border-b border-gray border-opacity-50 p-4 py-8 flex w-full">
          <span className="pl-20"> حمل و نقل :</span>
          <span className="text-[#1E7E34] font-bold">{(30000).toLocaleString("fa")}</span>
        </div>
        <div className=" p-4 py-8 flex w-full">
          <span className="pl-20"> مجموع :</span>
          <span className="text-primary font-bold">{(totalPrice + 30000).toLocaleString("fa")}</span>
        </div>
      </div>
        <Button className="mt-2 w-full" title="اقدام به پرداخت"/>
    </div>
  );
}

export default TotalPriceSection;
