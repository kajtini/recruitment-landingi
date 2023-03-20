import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { cartAdded, selectCarts } from "../../features/Carts/cartsSlice";
import { ProductDetailed } from "../../features/Carts/cartsTypes";
import { selectUser } from "../../features/user/userSlice";
import PaginationControl from "../Pagination/PaginationControl";
import ProductExcerpt from "./ProductExcerpt";

const ProductsList = () => {
  const [products, setProducts] = useState<Array<ProductDetailed> | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCart, setCurrentCart] = useState<
    Array<{
      id: number;
      quantity: number;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const carts = useAppSelector(selectCarts);
  const perPage = 6;

  const handleConfirmAdd = (productId: number, quantity: number) => {
    setCurrentCart((prevCurrentCart) => [
      ...prevCurrentCart,
      { id: productId, quantity: quantity },
    ]);
  };

  const handleRemoveFromCart = (productId: number) => {
    setCurrentCart((prevCurrentCart) =>
      prevCurrentCart.filter((product) => product.id !== productId)
    );
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

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products");
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentProductQuantity = (productId: number) => {
    const currProductQuantity = currentCart.find(
      (product) => product.id === productId
    )?.quantity;

    return currProductQuantity;
  };

  const checkIfInCart = (productId: number) => {
    return Boolean(currentCart.find((prod) => prod.id === productId));
  };

  const handleAddCart = async (
    cart: Array<{ id: number; quantity: number }>
  ) => {
    try {
      setIsLoading(true);
      const res = await axios.post("https://dummyjson.com/carts/add", {
        userId: user?.id,
        products: cart,
      });
      dispatch(cartAdded(res.data));
      setCurrentCart([]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products) {
      setTotalPages(Math.ceil(products.length / 6));
    }
  }, [products]);

  return (
    <div>
      <Link
        to="/"
        className="bg-active py-1 w-full block max-w-[150px] text-center rounded-full mb-10"
      >
        Back To Home
      </Link>

      <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row items-center justify-between  mb-5">
        <h2 className="text-3xl text-center sm:text-left sm:text-5xl">
          Browse the products
        </h2>

        {currentCart.length > 0 && (
          <button
            className="bg-tertiary py-1 rounded-full w-full max-w-[256px]
            disabled:bg-gray disabled:bg-opacity-40"
            onClick={() => handleAddCart(currentCart)}
            disabled={isLoading ? true : false}
          >
            Add cart with {currentCart.length} products
          </button>
        )}
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch mb-10">
        {products
          ?.map((product) => (
            <ProductExcerpt
              key={product.id}
              product={product}
              handleConfirmAdd={handleConfirmAdd}
              handleRemoveFromCart={handleRemoveFromCart}
              isInCart={checkIfInCart(product.id)}
              currentQuantity={getCurrentProductQuantity(product.id) || 0}
            />
          ))
          .slice((currentPage - 1) * perPage, currentPage * perPage)}
      </ul>
      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </div>
  );
};

export default ProductsList;
