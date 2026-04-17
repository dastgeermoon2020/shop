"use client";
import { addToCart } from "@/store/cartSlice";
import { useAppSelector } from "@/store/hooks";
import { IProduct } from "@/types/product";
import { PRODUCTS } from "@/utils/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import QuantityButton from "./QuantityButton";
import Link from "next/link";

const Products = () => {
  const { items, products } = useAppSelector((state) => state.cart);

  const dispatch = useDispatch();
  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: IProduct,
  ) => {
    e.stopPropagation();
    dispatch(addToCart({ product }));
  };
  return (
    <div className="py-5 xs:px-4 lg:px-20">
      <div className="grid grid-cols-1 px-2 lg:grid-cols-4 gap-6 w-full">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border-0.5 shadow-sm border-santas-gray overflow-hidden cursor-pointer "
          >
            <div className="aspect-square">
              <Link href={`product/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={900}
                  height={900}
                  className="w-full h-full object-cover"
                ></Image>
              </Link>

              <div className="px-4 py-3 flex flex-col">
                <div>
                  <p className="text-xs font-medium tracking-wide uppercase text-paly-sky">
                    {product.category}
                  </p>
                  <h1 className="text-lg tracking-tight mt-2">
                    {/* <Link href={product.id}>{product.name}</Link> */}
                    <Link href={`product/${product.id}`}>{product.name}</Link>
                  </h1>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-lg font-semibold text-shark">
                    ${product.price}
                  </p>
                  {items.some((item) => item.product.id === product.id) ? (
                    <QuantityButton product={product} />
                  ) : (
                    <button
                      className="font-medium text-sm px-3 bg-gray-100 border border-athens-gray py-2 cursor-pointer rounded-md flex items-center justify-center gap-2 "
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6">
          <h1 className="text-3xl font-bold">No Products found</h1>
          <p className="text-paly-sky mt-3">Please Adjust your Search Query</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Products;
