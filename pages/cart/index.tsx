import React from "react";
import MainLayout from "../../src/layouts/MainLayout";
import { useSelector } from "react-redux";
import EmptyCart from "../../src/components/cart/EmptyCart";
import CartSection from "../../src/components/cart/CartSection";
import Head from "next/head";

function Cart() {
  const { items } = useSelector((store: any) => store.cart);

  return (
    <>
      <Head>
        <title>سبد خرید</title>
      </Head>
      <MainLayout>
        <div className="container mx-auto p-4">
          {!items.length ? <EmptyCart /> : <CartSection />}
        </div>
      </MainLayout>
    </>
  );
}

export default Cart;
