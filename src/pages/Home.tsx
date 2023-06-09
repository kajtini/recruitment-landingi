import { useEffect } from "react";
import WelcomeMessage from "../components/Home/WelcomeMessage";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/user/userSlice";
import CartsList from "../features/Carts/CartsList";

const Home = () => {
  const user = useAppSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signIn");
    }
  }, [user]);

  return (
    <div className="flex-grow w-full flex  flex-col justify-center ">
      <WelcomeMessage />
      <CartsList />
    </div>
  );
};

export default Home;
