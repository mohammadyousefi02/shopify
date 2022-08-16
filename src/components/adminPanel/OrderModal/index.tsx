import React from "react";

import { MdClose } from "../../../../icons";
import { Iorders } from "../../../../interfaces/orderInterface";
import Button from "../../Button";

import { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import useAuthUserToken from "../../../../hooks/useAuthUserToken";
import axios from "axios";
import { server } from "../../../../config/server";

interface Props {
  closeOrderModalHandler: () => void;
  order:Iorders,
  deliverHandler:()=>void
}

function OrderModal({closeOrderModalHandler, order, deliverHandler}: Props) {
  
  return (
    <div className="bg-black bg-opacity-50 absolute top-0 h-full w-full flex items-center justify-center">
      <div className="bg-white rounded p-6 min-w-[500px] max-w-[500px]">
        <div className="flex justify-between items-center text-[24px]">
          <h1>جزئیات سفارش</h1>
          <MdClose onClick={closeOrderModalHandler} className="cursor-pointer"/>
        </div>
        <div className="flex flex-col gap-6 mt-4">
          <div>
            <span>نام :</span>
            <span>{order.customer.name}</span>
          </div>
          <div>
            <span>آدرس :</span>
            <span>{order.customer.province} ، {order.customer.city} ، {order.customer.address}</span>
          </div>
          <div>
            <span>شماره همراه :</span>
            <span>{order.customer.number}</span>
          </div>
          <div>
            <span>زمان سفارش :</span>
            <span>{new DateObject({date:order.order.createdAt,calendar:persian,locale: persian_fa}).format()}</span>
          </div>
          <div>
            <span>زمان تحویل سفارش :</span>
            <span>{order.delivered ? new DateObject({date:order.deliveredAt,calendar:persian,locale: persian_fa}).format() : "---"}</span>
          </div>
          <div>
            {order.order.items.map((item)=>(
              <div key={item._id} className="flex justify-around">
                <span>{item.product.name} ، {item.product.number} ،  {item.size} ، {item.color}</span>
                <span>{item.quantity}</span>
                <span>{((+item.product.price)*item.quantity).toLocaleString("fa")}</span>
              </div>
            ))}
          </div>
          {!order.delivered && <Button title="تحویل داده شد" onClick={deliverHandler}/>}
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
