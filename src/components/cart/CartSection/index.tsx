import React from "react";
import CartTable from "../CartTable";
import TotalPriceSection from "../TotalPriceSection";

function CartSection() {
  return (
      <div className="bg-white flex flex-col lg:flex-row items-start px-4 py-8 gap-4 overflow-x-auto">
        <CartTable />
        <TotalPriceSection />
      </div>
  );
}

export default CartSection;
