import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import Spinner from "./Spinner";

function ProtectProfile() {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  if (!user) {
    setInterval(() => {
      navigate("/signin");
    }, 1000);
    return (
      <div className=" my-24 max-w-lg sm:max-w-xl mx-auto">
        <Spinner />;
      </div>
    );
  }

  console.log(user);
  return <Outlet />;
}
export default ProtectProfile;
