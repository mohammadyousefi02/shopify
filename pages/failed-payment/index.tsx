import Link from "next/link";
import React from "react";

import { IoCloseCircleSharp } from "../../icons";

function FailedPayment() {
  return (
    <div className="h-full bg-white flex justify-center items-center">
      <div className="flex flex-col items-center py-16">
        <h1 className="text-4xl">نتیجه پرداخت</h1>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <IoCloseCircleSharp fontSize={64} color="#F44336" />
            <span className="text-2xl">
                متاسفانه پرداخت شما با مشکل مواجه شده است
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

export default FailedPayment;
