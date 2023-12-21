import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_HOST } from "../Costant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, successUser, setError } from "../redux/slice/userSlice";
import type { RootState } from "../redux/store";
import Oauth from "../components/Oauth";

interface User {
  email: string | null;
  password: string | null;
}

function Signin() {
  const [formData, setFormData] = useState<User>({
    email: null,
    password: null,
  });
  const { loading, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setError(""));
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  //  submit form
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await fetch(`${URL_HOST}/api/auth/signin`, {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res) dispatch(setLoading(false));

      const data = await res.json();
      if (data.success === false) {
        dispatch(setError(data.message));
      }

      navigate("/");
      dispatch(successUser(data));
      console.log(data);
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <div className=" my-24 max-w-lg sm:max-w-xl mx-auto px-4 sm:px-0">
      <h1 className="font-semibold text-3xl sm:text-4xl text-center text-slate-900">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
        <input
          onChange={handleChange}
          className="input"
          type="text"
          placeholder="email"
          id="email"
        />
        <input
          onChange={handleChange}
          className="input"
          type="password"
          placeholder="password"
          id="password"
        />
        {/* buttons */}
        <div className="flex flex-col gap-2">
          <button
            disabled={loading}
            className="cursor-pointer bg-violet-600 text-white py-4 rounded-lg text-lg font-medium uppercase w-full hover:opacity-95 hover:transition-colors disabled:opacity-80 "
          >
            {loading ? "loading..." : "sign in"}
          </button>
          <Oauth />
        </div>

        {/* sign up button */}
        <div className="flex gap-2 font-medium">
          <p>have no account ?</p>
          <p
            onClick={() => navigate("/signup")}
            className="text-blue-700 hover:underline cursor-pointer"
          >
            sign up
          </p>
        </div>
        {/* errors */}
        <p className="font-medium text-red-500">{error ? error : null}</p>
      </form>
    </div>
  );
}

export default Signin;
