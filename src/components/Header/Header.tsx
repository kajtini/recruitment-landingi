import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, selectUser } from "../../features/user/userSlice";

const Header = () => {
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const handleSignOut = () => dispatch(logout());

  return (
    <header className="flex items-center justify-between px-8 w-full max-w-[1500px]">
      <h2 className="text-xl">Dashboard</h2>

      {user ? (
        <div className="flex items-center gap-2">
          <button
            className="bg-tertiary py-2 px-6 rounded-full"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
          <img
            className="max-h-10 rounded-full"
            src={user.image}
            alt="user image"
          />
        </div>
      ) : (
        <Link to="signIn">
          <button className="bg-tertiary py-2 px-6 rounded-full">
            Sign In
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;
