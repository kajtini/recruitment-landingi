import axios from "axios";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login, selectUser } from "./userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const navigate = useNavigate();

  const handleUsernameChage = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPassword("");
    setUsername("");
    signIn(username, password);
  };

  const signIn = async (username: string, password: string) => {
    try {
      const user = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      dispatch(login(user.data));
    } catch (error) {
      console.error(error);
    }
  };

  const canSubmit = username && password;

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <form className="flex flex-col w-full gap-5" onSubmit={handleSubmit}>
      <h2 className="text-5xl ">Sign In</h2>
      <input
        className=" bg-gray p-4 rounded-lg  bg-opacity-10"
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChage}
      />
      <input
        className=" bg-gray p-4 rounded-lg bg-opacity-10"
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button
        className="bg-tertiary py-3 rounded-full max-w-[150px] w-full  self-end disabled:bg-gray disabled:opacity-40 transition-colors duration-200"
        disabled={canSubmit ? false : true}
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
