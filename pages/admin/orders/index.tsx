import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { server } from "../../../config/server";
import useAuthUserToken from "../../../hooks/useAuthUserToken";
import { Iorders } from "../../../interfaces/orderInterface";
import OrderModal from "../../../src/components/adminPanel/OrderModal";
import OrderSection from "../../../src/components/adminPanel/OrderSection";
import OrderTable from "../../../src/components/adminPanel/OrderTable";
import Button from "../../../src/components/Button";
import AdminPanelLayout from "../../../src/layouts/AdminPanelLayout";

function Orders() {
  const [deliveredOrders, setDeliveredOrders] = useState<Iorders[]>([]);
  const [undeliveredOrders, setUndeliveredOrders] = useState<Iorders[]>([]);
  const buttons = ["ارسال شده", "در حال ارسال"];
  const [selected, setSelected] = useState(buttons[0]);
  const [orders, setOrders] = useState<Iorders[]>([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Iorders>();

  useEffect(() => {
    if (selected === buttons[0]) {
      setOrders(deliveredOrders!);
    } else {
      setOrders(undeliveredOrders!);
    }
  }, [selected]);
  const getDeliveredOrders = () =>
    axios
      .get(`${server}/api/orders/get-delivered-orders`)
      .then((e) => setDeliveredOrders(e.data))
      .catch((e) => console.log(e));
  const getUndeliveredOrders = () =>
    axios
      .get(`${server}/api/orders/get-undelivered-orders`)
      .then((e) => setUndeliveredOrders(e.data))
      .catch((e) => console.log(e));

  useLayoutEffect(() => {
    axios
      .get(`${server}/api/orders/get-delivered-orders`)
      .then((res) => {
        setDeliveredOrders(res.data);
        setOrders(res.data);
      })
      .catch((e) => console.log(e));
    getUndeliveredOrders();
  }, []);

  const changeSelected = (value: string) => {
    setSelected(value);
  };

  const showOrderModalHandler = (order: Iorders) => {
    setShowOrderModal(true);
    setSelectedOrder(order);
  };

  const closeOrderModalHandler = () => {
    setShowOrderModal(false);
  };

  const [token] = useAuthUserToken();
  const deliverHandler = async () => {
    try {
      await axios.post(
        `${server}/api/orders/change-delivery-status/${selectedOrder!._id}`,
        null,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      closeOrderModalHandler();
      getDeliveredOrders();
      axios
        .get(`${server}/api/orders/get-undelivered-orders`)
        .then((res) => {
          setUndeliveredOrders(res.data);
          setOrders(res.data);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      alert("خطایی رخ داده است");
    }
  };
  return (
    <div>
      <AdminPanelLayout>
        {deliveredOrders && undeliveredOrders && (
          <div className="container mx-auto px-4">
            <div className="bg-white mt-4 px-4 rounded-lg">
              <div className="flex justify-between items-center border-b border-gray py-2">
                <h1>سفارش ها</h1>
                <div className="flex gap-2">
                  {buttons.map((b) => (
                    <Button
                      key={b}
                      onClick={() => changeSelected(b)}
                      title={b}
                      color={selected === b ? "pink" : "gray"}
                      rounded="normal"
                      className="px-12"
                    />
                  ))}
                </div>
              </div>
              <OrderTable
                orders={orders}
                showOrderModalHandler={showOrderModalHandler}
              />
            </div>
          </div>
        )}
      </AdminPanelLayout>
      {showOrderModal && (
        <OrderModal
          order={selectedOrder!}
          deliverHandler={deliverHandler}
          closeOrderModalHandler={closeOrderModalHandler}
        />
      )}
    </div>
  );
}

export default Orders;
