import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { URL_HOST } from "../Costant";
import Searchbar from "./Searchbar";

function Navbar() {
  const { user } = useSelector((state: RootState) => state.user);

  const imagePath = user?.avatar?.startsWith("https://upload")
    ? user.avatar
    : `${URL_HOST}/users/${user?.avatar}`;

  return (
    <header className="  py-4 px-4 lg:px-0 bg-purple-50 shadow-md">
      <div className="container flex justify-between items-center">
        {/* title */}
        <Link
          to={"/"}
          className="font-bold text-base sm:text-2xl flex flex-col sm:inline-block"
        >
          <span className="text-purple-400">Haitar</span>
          <span className="text-purple-700">Estate</span>
        </Link>
        {/* input */}
        <Searchbar />
        {/* navbar */}
        {user?.avatar ? (
          <Link
            to={"/profile"}
            className="flex items-center gap-3 font-semibold "
          >
            <p>{user.username}</p>
            <img
              className="h-11 w-11 rounded-full mx-auto object-cover cursor-pointer"
              src={imagePath}
              alt={`${user.avatar} photo`}
            />
          </Link>
        ) : (
          <ul className="flex gap-8 text-lg font-medium text-stone-700">
            <li>
              <Link to={"/signin"} className="hover:underline">
                Sign in
              </Link>
            </li>
            <li className="hidden sm:inline">
              <Link to={"/signup"} className="hover:underline">
                Sign up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
export default Navbar;
