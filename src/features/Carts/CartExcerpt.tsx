import React from "react";
import { Cart } from "./cartsTypes";
import { BsFillCartFill } from "react-icons/bs";
import { AiFillDollarCircle, AiOutlineLineChart } from "react-icons/ai";
import { IoIosRemove } from "react-icons/io";
import { useAppDispatch } from "../../app/hooks";
import { cartRemoved, cartSelected } from "./cartsSlice";

interface CartExcerptProps {
  cart: Cart;
}

const CartExcerpt = ({ cart }: CartExcerptProps) => {
  const dispatch = useAppDispatch();

  const handleViewChart = () => {
    dispatch(cartSelected(cart));
  };

  const handleCartRemove = () => {
    dispatch(cartRemoved(cart));
  };

  return (
    <li className="bg-gray bg-opacity-20 p-5 rounded-2xl flex flex-col gap-4 ">
      <div className="flex items-center justify-between">
        <div className="flex gap-5 items-center">
          <div className="p-3 bg-active rounded-xl">
            <BsFillCartFill />
          </div>
          <p className="text-light text-lg">Cart {cart.id}</p>
        </div>

        <div className="flex gap-1 items-center">
          <AiFillDollarCircle className="fill-[#91CB7D]" />
          <p className="text-light text-lg">{cart.total}</p>
        </div>
      </div>

      <div>
        <p className="text-gray font-medium text-lg mb-1">
          Total products {cart.totalProducts}
        </p>
        <p className="text-gray font-medium text-lg ">
          Total products quantity {cart.totalQuantity}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          className="border-tertiary py-1 border-[1px] border-solid rounded-full"
          onClick={handleCartRemove}
        >
          Remove Cart
        </button>
        <button
          className="bg-tertiary rounded-full py-1 flex items-center gap-2 justify-center"
          onClick={handleViewChart}
        >
          <AiOutlineLineChart />
          View Chart
        </button>
      </div>
    </li>
  );
};

export default CartExcerpt;
