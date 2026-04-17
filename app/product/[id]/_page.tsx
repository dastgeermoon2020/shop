"use client";
import QuantityButton from "@/components/QuantityButton";
import { addToCart } from "@/store/cartSlice";
import { useAppSelector } from "@/store/hooks";
import { IProduct } from "@/types/product";
import { findProductById } from "@/utils/product";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: IProduct,
  ) => {
    e.stopPropagation();
    dispatch(addToCart({ product }));
  };
  const { id } = useParams();
  const product = findProductById(id as string);

  const { items, products } = useAppSelector((state) => state.cart);

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center py-16">
        <h2 className="text-3xl font-bold">Product not found</h2>
        <p className="text-lg py-3">
          product you are looking for is not available
        </p>

        <Link
          className="text-sm font-medium rounded-md bg-red-500 text-white py-2 px-4"
          href="/"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="px-20 my-6">
      <div className="flex gap-2 pb-3">
        <Link href="/" className="flex">
          <ArrowLeft /> Back
        </Link>
      </div>

      <div className="flex">
        <Image
          src={product.image}
          width={400}
          height={400}
          alt={product.name}
          className=" h-full xs:w-full lg:w-1/2 rounded-xl"
        />
        <div className="px-5 lg:w-full">
          <p className="text-red-500 font-semibold uppercase pb-2">
            {product.category}
          </p>
          <h1 className="text-2xl font-bold ">{product.name}</h1>
          <h3 className="text-santas-gray font-bold text-3xl py-4">
            $ {product.price}
          </h3>
          <p>{product.description}</p>

          <div className="flex gap-3 py-4 items-center">
            {/* button and */}
            {items.some((item) => item.product.id === product.id) ? (
              <QuantityButton product={product} />
            ) : (
              <button
                className="font-medium text-sm px-3 bg-athens-gray border border-athens-gray py-2 cursor-pointer rounded-md flex items-center justify-center gap-2 "
                onClick={(e) => handleAddToCart(e, product)}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            )}
            <Link
              href="/cart"
              className="font-medium text-sm px-5 text-white bg-red-500 border border-athens-gray py-2 cursor-pointer rounded-md "
            >
              View Cart
            </Link>

            {/* bbutt */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
