import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import React, { useEffect, useRef, useState } from "react";
import { URL_HOST } from "../Costant";
import {
  deleteUser,
  setError,
  setLoading,
  successUser,
  updateImage,
} from "../redux/slice/userSlice";
import { Link } from "react-router-dom";

function Profile() {
  const [formData, setFormData] = useState({});
  const [selectImg, setSelectImg] = useState(undefined);
  const imgRef = useRef(null);
  const { user, error, loading } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();

  const imagePath = user?.avatar?.startsWith("https://upload")
    ? user.avatar
    : `${URL_HOST}/users/${user?.avatar}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await fetch(`${URL_HOST}/api/user/updateUser/${user?._id}`, {
        body: JSON.stringify(formData),
        credentials: "include",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`cannot get User with id: ${user?._id}`);

      const data = await res.json();

      dispatch(successUser(data));
    } catch (error) {
      console.log(error);
    }
  };

  // handle delete -----------
  const handleDeleteAccount = async () => {
    try {
      dispatch(setLoading(true));
      const res = await fetch(`${URL_HOST}/api/user/deleteUser/${user?._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error occurred while deleting user");
      await res.json();

      dispatch(deleteUser());
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(setLoading(true));
      const res = await fetch(`${URL_HOST}/api/auth/signout/${user?._id}`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error occurred while deleting user");
      await res.json();

      dispatch(deleteUser());
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    if (selectImg) {
      const uploadImage = async () => {
        try {
          dispatch(setLoading(true));
          const formData = new FormData();
          formData.append("avatar", selectImg);

          const res = await fetch(`${URL_HOST}/api/user/updateImg`, {
            method: "PATCH",
            body: formData,
            credentials: "include",
          });
          console.log(res.ok);

          if (!res.ok) {
            dispatch(setError("Error on updating image"));
            throw new Error("Error fetching image");
          }

          const data = await res.json();
          dispatch(updateImage(data));
          dispatch(setLoading(false));

          setSelectImg(undefined);
        } catch (error) {
          console.log(error);
          dispatch(setError("Error occured on the server"));
        }
      };

      uploadImage();
    }
  }, [selectImg, dispatch]);
  return (
    <div className=" my-24 max-w-lg sm:max-w-xl mx-auto">
      <h1 className="font-semibold text-3xl sm:text-4xl text-center text-slate-900">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
        <img
          src={imagePath}
          alt={`${user?.avatar} photo`}
          className="h-32 w-32 rounded-full mx-auto object-cover cursor-pointer"
          id="avatar"
          onClick={() => imgRef?.current?.click()}
        />
        <input
          type="file"
          accept="image/*"
          ref={imgRef}
          hidden
          onChange={(e) => setSelectImg(e.target.files[0])}
        />
        <div className="text-center">
          {loading ? (
            <p className="text-base font-medium ">Loading...</p>
          ) : null}
          {error ? (
            <p className="text-red-600 text-base font-medium">{error}</p>
          ) : null}
        </div>
        <input
          className="input"
          type="text"
          placeholder="username"
          id="username"
          defaultValue={user?.username}
          onChange={handleChange}
        />

        <input
          className="input"
          type="text"
          placeholder="email"
          id="email"
          defaultValue={user?.email}
          onChange={handleChange}
        />
        <input
          className="input"
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        {/* buttons */}
        <div className="flex flex-col gap-2">
          <button
            disabled={false}
            className="cursor-pointer bg-slate-700 text-white py-4 rounded-lg text-lg font-medium uppercase w-full hover:opacity-95 hover:transition-colors disabled:opacity-80"
          >
            update
            {/* {false ? "loading..." : "sign up"} */}
          </button>
          <Link
            to={"/create-listing"}
            className="cursor-pointer bg-violet-700 text-white py-4 rounded-lg text-lg font-medium uppercase w-full hover:opacity-95 hover:transition-colors disabled:opacity-80 text-center"
          >
            Create listing
          </Link>
        </div>

        {/* sign in button */}
        <div className="flex justify-between gap-2 font-medium">
          <p
            onClick={handleDeleteAccount}
            className="text-red-700 hover:underline cursor-pointer"
          >
            Delete account
          </p>
          <p
            onClick={handleSignout}
            className="text-red-700 hover:underline cursor-pointer"
          >
            Sign out
          </p>
        </div>
        {/* errors */}
        {/* <p className="font-medium text-red-500">{error ? error : null}</p> */}
      </form>
    </div>
  );
}
export default Profile;
