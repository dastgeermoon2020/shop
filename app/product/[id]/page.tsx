"use client";
import QuantityButton from "@/components/QuantityButton";
import { addToCart } from "@/store/cartSlice";
import { useAppSelector } from "@/store/hooks";
// import { IProduct } from "@/types/product";
import { findProductById } from "@/utils/product";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

function page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = findProductById(id as string);

  const items = useAppSelector((state) => state.cart.items);

  const handleAddToCart = () => {
    dispatch(addToCart({ product }));
  };

  if (!product)
    return (
      <>
        <div className="flex flex-col items-center justify-center py-6">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p className="text-paly-sky ">
            The item you are looking for does not exist
          </p>
          <Link
            href="/"
            className="text-sm font-medium py-2 rounded-md px-4 bg-red-500 text-white mt-6"
          >
            Back to Products
          </Link>
        </div>
      </>
    );

  return (
    <>
      <div className="py-8 md:px-20  px-2">
        <Link href="/" className="flex items-center  gap-2 font-medium text-sm">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="md:flex block gap-8 mt-6 w-full">
          <div className="overflow-hidden rounded-2xl flex-1 h-75 md:h-146">
            <Image
              src={product.image}
              width={400}
              height={400}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* right side */}
          <div className="flex gap-2 pt-3 md:pt-0 flex-col flex-1">
            <p className="text-sm font-medium uppercase tracking-wider text-red-500">
              {product.category}
            </p>
            <h1 className="text-4xl font-bold tracking-tight">
              {product.name}
            </h1>
            <p className="mt-4 text-3xl text-shark font-bold">
              $ {product.price}
            </p>
            <p className="mt-5 leading-relaxed text-paly-sky">
              {product.description}
            </p>

            <div className="flex gap-4 mt-6">
              {/* button and */}
              {items.some((item) => item.product.id === product.id) ? (
                <QuantityButton product={product} />
              ) : (
                <button
                  className="font-medium flex-3 text-sm border border-color-athens-gray py-2.5 cursor-pointer rounded-md flex items-center justify-center gap-2 shadow-xs  bg-red-500 text-white"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
              )}
              <button
                className="font-medium flex-1 text-sm cursor-pointer border border-athens-gray rounded-md shadow-xs"
                onClick={() => router.push("/cart")}
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
