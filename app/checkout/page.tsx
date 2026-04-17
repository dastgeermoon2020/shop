import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const checkout = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="w-26 h-26 p-4 flex items-center justify-center rounded-full bg-athens-gray ">
          <ShoppingBag className="h-10 w-10 text-paly-sky" />
        </div>
        <h1 className="font-bold text-3xl mt-4">This Feature is Coming Soon</h1>
        <p className="text-paly-sky my-4">
          Working on the checkout page. it will be available soon.
        </p>
        <Link
          href="/"
          className="flex gap-2 items-center justify-center px-4 py-2 bg-red-500 rounded-md text-white"
        >
          <ArrowLeft className="text-white h-6 w-6" />
          Go to Shop
        </Link>
      </div>
    </>
  );
};

export default checkout;
