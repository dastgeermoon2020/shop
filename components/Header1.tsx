"use client";
import {
  LucideDoorClosedLocked,
  MenuIcon,
  Package,
  Search,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "@/store/cartSlice";
import { Menu } from "lucide-react";

const Header1 = () => {
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

  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
    console.log(showMenu);
  };
  return (
    <>
      <header className="flex items-center h-16  gap-3 justify-between sticky top-0 z-10 backdrop-blur py-4 border-b-1 border-athens-gray px-2 md:px-20">
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

          <div className="flex gap-3 pr-2 flex-row-reverse md:flex-row">
            <ul className="gap-5 hidden md:flex">
              <li className="">
                <Link href="/">HOME</Link>
              </li>
              <li>
                <Link href="/about">ABOUT</Link>
              </li>
              <li>
                <Link href="/contact">CONTACT</Link>
              </li>
            </ul>

            <MenuIcon onClick={handleMenuClick} className="block md:hidden" />
            {showMenu ? (
              <ul className="md:hidden flex flex-col gap-2 py-2 px-3 absolute left-0 top-16 bg-white barkdrop-blur w-full">
                <li className="">
                  <Link href="/">HOME</Link>
                </li>
                <li>
                  <Link href="/about">ABOUT</Link>
                </li>
                <li>
                  <Link href="/contact">CONTACT</Link>
                </li>
              </ul>
            ) : null}

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

export default Header1;
