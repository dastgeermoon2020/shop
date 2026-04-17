"use client";
import QuantityButton from "@/components/QuantityButton";
import { useAppSelector } from "@/store/hooks";
import { ArrowLeft, Box, ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const items = useAppSelector((state) => state.cart.items);
  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  );

  if (!items.length)
    return (
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="w-26 h-26 p-4 flex items-center justify-center rounded-full bg-athens-gray ">
          <ShoppingBag className="h-10 w-10 text-paly-sky" />
        </div>
        <h1 className="font-bold text-3xl mt-4">Cart is Empty</h1>
        <p className="text-paly-sky my-4">
          It looks that you have not added any Item to the Cart
        </p>
        <Link
          href="/"
          className="flex gap-2 items-center justify-center px-4 py-2 bg-red-500 rounded-md text-white"
        >
          <ArrowLeft className="text-white h-6 w-6" />
          Go to Shop
        </Link>
      </div>
    );
  return (
    <div className=" py-8 max-w-full px-20 ">
      <h1 className="text-3xl font-bold tracking-tight">Shoping Cart</h1>
      <p className="text-paly-sky">{items.length} items in the cart</p>

      <div className="mt-8 grid grid-cols-3 gap-8">
        <div className="border p-3 border-athens-gray rounded-md col-span-2">
          <div className="flex flex-col gap-3">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 pb-2 border-b-2 border-b-border-athens-gray last:border-b-0"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={96}
                  height={96}
                  className="w-full flex-1 object-cover rounded-md"
                ></Image>
                <div className="flex-8">
                  <h3 className="font-bold text-xl leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-sm text-paly-sky mb-2">
                    ${product.price} each
                  </p>
                  <QuantityButton product={product} />
                </div>

                <div className="flex-2">
                  <div className="font-bold flex pr-2 justify-end">
                    $ {(product.price * quantity).toLocaleString()}
                  </div>
                  <div className="mt-5 flex items-center pr-2 justify-end">
                    <Trash className="w-5 h-5 text-red-500" />
                    <span className="text-red-500">Remove</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 border p-3 border-athens-gray rounded-md sticky top-32">
          <h1 className="tracking-tight text-2xl font-bold">Order Summary</h1>
          <div className="flex justify-between gap-3 mt-4">
            <span className="text-paly-sky">subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>

          <div className="flex border-b-1 pb-4 border-b-border-athens-gray justify-between gap-3 mt-4">
            <span className="text-paly-sky">Tax 13%</span>
            <span>${(subtotal * 0.13).toLocaleString()}</span>
          </div>

          <div className="flex justify-between gap-3 mt-4">
            <span className="font-bold text-xl">Grand Total</span>
            <span className="font-bold text-xl">
              ${(subtotal * 0.13 + subtotal).toLocaleString()}
            </span>
          </div>
          <div className="flex mt-6 justify-center">
            <Link
              href="/checkout"
              className="bg-red-500 flex-1 justify-center text-center py-2 items-center text-white rounded-sm"
            >
              CheckOut
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
