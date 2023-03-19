import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import WelcomeMessage from "../components/Home/WelcomeMessage";
import { Routes, Route, useNavigate } from "react-router-dom";
import Products from "../features/Carts/CreateCart";
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
    <div className="flex-grow w-full">
      <WelcomeMessage />
      <CartsList />
    </div>
  );
};

export default Home;
