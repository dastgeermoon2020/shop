import { addToCart, removeFromCart } from "@/store/cartSlice";
import { useAppSelector } from "@/store/hooks";
import { IProduct } from "@/types/product";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";

const QuantityButton = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const selectedItem = items.find((item) => item.product.id === product.id);

  const handleMinusButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(removeFromCart({ productId: product.id }));
  };

  const handleAddButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(addToCart({ product }));
  };

  return (
    <div className="flex items-center">
      <button
        className="border font-medium text-xs rounded-md w-9 h-9 cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white rounded-r-none"
        onClick={handleMinusButton}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="px-4 h-9 tabular-nums border border-l-0 border-r-0 flex items-center justify-center">
        {selectedItem?.quantity}
      </span>
      <button
        className="border font-medium text-xs rounded-md w-9 h-9 cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white rounded-l-none"
        onClick={handleAddButton}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default QuantityButton;
