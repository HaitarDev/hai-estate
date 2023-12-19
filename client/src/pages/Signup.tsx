import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL_HOST } from "../Costant";

function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  //  submit form
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${URL_HOST}/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res) setIsLoading(false);
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError("");
        navigate("/signin");
        // setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className=" my-24 max-w-lg sm:max-w-xl mx-auto">
      <h1 className="font-semibold text-3xl sm:text-4xl text-center text-slate-900">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
        <input
          onChange={handleChange}
          className="input"
          type="text"
          placeholder="username"
          id="username"
        />
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
        <div>
          <button
            disabled={isLoading}
            className="cursor-pointer bg-violet-600 text-white py-4 rounded-lg text-lg font-medium uppercase w-full hover:opacity-95 hover:transition-colors disabled:opacity-80"
          >
            {isLoading ? "loading..." : "sign up"}
          </button>
        </div>

        {/* sign in button */}
        <div className="flex gap-2 font-medium">
          <p>have an account ?</p>
          <p
            onClick={() => navigate("/signin")}
            className="text-blue-700 hover:underline cursor-pointer"
          >
            sign in
          </p>
        </div>
        {/* errors */}
        <p className="font-medium text-red-500">{error ? error : null}</p>
      </form>
    </div>
  );
}

export default Signup;
