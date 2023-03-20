import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import ProductsList from "../components/Products/ProductsList";
import { selectUser } from "../features/user/userSlice";

const CreateCart = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signIn");
    }
  }, [user]);

  return (
    <div className="flex-grow w-full flex flex-col justify-center">
      <ProductsList />
    </div>
  );
};

export default CreateCart;
