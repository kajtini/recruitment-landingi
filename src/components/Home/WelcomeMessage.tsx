import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";

const WelcomeMessage = () => {
  const user = useAppSelector(selectUser);

  return (
    <h1 className="text-3xl text-left leading-10 mb-8">
      Hello,
      <br />
      <span>{user?.firstName}</span> <span>{user?.lastName}</span> 👋
    </h1>
  );
};

export default WelcomeMessage;
