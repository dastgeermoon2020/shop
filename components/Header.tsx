"use client";
import { Package, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "@/store/cartSlice";

const Header = () => {
  const pathnname = usePathname();
  const showSearchbar = pathnname === "/";
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalquantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(filterProducts(searchTerm));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, dispatch]);

  return (
    <>
      <header className="flex items-center  gap-3 justify-between sticky top-0 z-10 backdrop-blur py-4 border-b-1 border-athens-gray px-2 md:px-20">
        <div className="">
          <Link href="/" className="flex flex-2 gap-2">
            <Package className="w-6 h-6 text-red-500" />
            <span>Tech Shop</span>
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          {showSearchbar ? (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-santas-gray" />
              <input
                className="outline-none md:w-80 w-50 border border-athens-gray py-2 pl-8 rounded-md text-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          ) : null}

          <div className="pr-2">
            <Link href="/cart" className="relative flex flex-col gap-3">
              <ShoppingBag className="h-5 w-5" />
              <Badge className="w-5 h-5 absolute bg-red-500 text-xs text-white -top-3 left-3">
                {totalquantity ? totalquantity : 0}
              </Badge>
              {/* <span className="pl-4">Cart</span> */}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
