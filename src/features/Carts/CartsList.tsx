import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PaginationControl from "../../components/Pagination/PaginationControl";
import CartChart from "./CartChart";
import CartExcerpt from "./CartExcerpt";
import { cartsSet, selectCarts, selectSelectedCart } from "./cartsSlice";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const CartsList = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectSelectedCart);
  const carts = useAppSelector(selectCarts);

  const fetchCarts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/carts");
      dispatch(cartsSet(res.data.carts));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage - 1 > 0) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage + 1 <= totalPages) {
      setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
    }
  };

  useEffect(() => {
    if (!carts) {
      fetchCarts();
    }
  }, []);

  useEffect(() => {
    if (carts) {
      setTotalPages(Math.ceil(carts.length / 6));
    }
  }, [carts]);

  console.log(carts);
  console.log(totalPages);

  return (
    <>
      <div className="flex items-center gap-3 justify-center sm:justify-end mb-5">
        <h2 className="text-2xl">You can also</h2>
        <Link
          to="/createCart"
          className="  max-w-[150px] w-full bg-tertiary rounded-full py-1  flex items-center justify-center gap-3"
        >
          <BsFillCartFill />
          Create a cart
        </Link>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {carts
          ?.map((cart) => <CartExcerpt key={cart.id} cart={cart} />)
          .slice((currentPage - 1) * perPage, currentPage * perPage)}
      </ul>

      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
      {cart && <CartChart cart={cart} />}
    </>
  );
};

export default CartsList;
