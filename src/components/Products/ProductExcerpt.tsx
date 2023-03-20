import { Product } from "../../features/Carts/cartsTypes";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { useState } from "react";

interface ProductExcerptProps {
  product: Product;
  handleConfirmAdd: (productId: number, quantity: number) => void;
  handleRemoveFromCart: (productId: number) => void;
  currentQuantity: number;
  isInCart: boolean;
}

const ProductExcerpt = ({
  product,
  handleConfirmAdd,
  handleRemoveFromCart,
  currentQuantity,
  isInCart,
}: ProductExcerptProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState("");

  const canConfirm = Boolean(quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuantity(e.target.value);

  const handleConfirmSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuantity("");
    setIsAdding(false);
    handleConfirmAdd(product.id, +quantity);
  };
  const handleAddToCart = () => setIsAdding(true);
  const handleCancel = () => {
    setIsAdding(false);
    setQuantity("");
  };

  return (
    <li
      className={`bg-gray bg-opacity-20 rounded-2xl overflow-hidden flex flex-col ${
        product.stock && product.stock - currentQuantity === 0 && "opacity-50"
      }`}
    >
      <img
        className="h-36 w-full object-cover"
        src={product.thumbnail}
        alt="product image"
      />

      <div className="p-5 flex flex-col gap-3 flex-grow ">
        <div className="flex justify-between">
          <h3 className="text-2xl">{product.title}</h3>
          <div className="flex items-center gap-1">
            <AiFillDollarCircle className="fill-[#91CB7D]" />
            <span className="text-lg">{product.price}</span>
          </div>
        </div>

        <p className="text-gray font-medium leading-7">{product.description}</p>

        {isAdding ? (
          <form
            className="flex gap-3 items-center mt-auto"
            onSubmit={handleConfirmSubmit}
          >
            <input
              placeholder="Amount"
              type="number"
              max={product.stock && product.stock - currentQuantity}
              min={1}
              className="bg-gray bg-opacity-30 py-2 px-3 rounded-3xl max-w-[100px] sm:max-w-[150px] w-full"
              value={quantity}
              onChange={handleQuantityChange}
            />

            <div className="flex items-center gap-2 flex-grow ">
              <button
                className="bg-tertiary py-1 rounded-full w-full disabled:bg-gray disabled:bg-opacity-40"
                disabled={canConfirm ? false : true}
              >
                Confirm
              </button>
              <button
                className="border-tertiary border-solid border-[1px] py-1 rounded-full w-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleCancel();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-between mt-auto">
            <p className="text-xl font-medium text-">
              Stock: {product.stock ? product.stock - currentQuantity : 0}
            </p>

            <button
              className={`bg-tertiary py-1 rounded-full flex-grow max-w-[150px] flex items-center gap-2 justify-center ${
                isInCart &&
                "border-tertiary border-solid border-[1px] bg-transparent"
              }`}
              onClick={() => {
                isInCart ? handleRemoveFromCart(product.id) : handleAddToCart();
              }}
            >
              {!isInCart && <BsFillCartFill />}
              {isInCart ? "Remove from cart" : "Add To Cart"}
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default ProductExcerpt;
