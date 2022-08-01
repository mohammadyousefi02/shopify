import React from "react";
import CartTable from "../CartTable";
import TotalPriceSection from "../TotalPriceSection";

function CartSection() {
  return (
      <div className="bg-white flex items-start px-4 py-8 gap-4">
        <CartTable />
        <TotalPriceSection />
      </div>
  );
}

export default CartSection;
