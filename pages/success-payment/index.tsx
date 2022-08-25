import Head from "next/head";
import Link from "next/link";
import React from "react";

import { FaCheckCircle } from "../../icons";

function SuccessPayment() {
  return (
    <div className="h-full bg-white flex justify-center items-center">
      <Head>
        <title>خرید موفق</title>
      </Head>
      <div className="flex flex-col items-center py-16">
        <h1 className="text-4xl">نتیجه پرداخت</h1>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <FaCheckCircle fontSize={64} color="#56B261" />
            <span className="text-2xl">
              با تشکر از پرداخت شما سفارش شما ثبت شد
            </span>
          </div>
          <Link href="/">
            <a>
              <span className="text-primary cursor-pointer">
                بازگشت به صفحه اصلی
              </span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessPayment;
