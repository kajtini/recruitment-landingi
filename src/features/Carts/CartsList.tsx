import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PaginationControl from "../../components/Pagination/PaginationControl";
import CartChart from "./CartChart";
import CartExcerpt from "./CartExcerpt";
import { cartsSet, selectCarts, selectSelectedCart } from "./cartsSlice";

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
    fetchCarts();
  }, []);

  useEffect(() => {
    if (carts) {
      setTotalPages(Math.ceil(carts.length / 6));
    }
  }, [carts]);

  console.log(carts);
  console.log(totalPages);

  return (
    <div>
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
    </div>
  );
};

export default CartsList;
