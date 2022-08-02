import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { server } from "../../config/server";
import useAuthUserToken from "../../hooks/useAuthUserToken";
import TotalPriceSection from "../../src/components/cart/TotalPriceSection";
import InfosFields from "../../src/components/payment-info/InfosFields";
import MainLayout from "../../src/layouts/MainLayout";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../redux/slices/cartReducer"

function Payment() {
  const dispatch = useDispatch()
  const [token] = useAuthUserToken();
  const [name, setName] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [number, setNumber] = useState("");
  const router = useRouter();
  const order = async () => {
    if (name && province && city && address && zipCode && number) {
      const userInfo = { name, province, city, address, zipCode, number };
      try {
        await axios.post(`${server}/api/orders`, userInfo, {
          headers: {
            "x-auth-token": token,
          },
        });
        dispatch(emptyCart())
        router.push("/success-payment");
      } catch (error) {
        router.push("/failed-payment");
        console.log(error);
      }
    } else {
      router.push("/failed-payment");
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto pb-[90px] px-4">
        <div className="bg-white rounded-lg flex gap-8 items-start mt-4 p-4">
          <InfosFields
            name={name}
            setName={setName}
            province={province}
            setProvince={setProvince}
            city={city}
            setCity={setCity}
            address={address}
            setAddress={setAddress}
            zipCode={zipCode}
            setZipCode={setZipCode}
            number={number}
            setNumber={setNumber}
          />
          <div className="flex-[0.5] flex justify-center">
            <TotalPriceSection onClick={order} discountField={true}/>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Payment;
