import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useRef, useState } from "react";
import { URL_HOST } from "../Costant";
import { updateImage } from "../redux/slice/userSlice";

function Profile() {
  const [selectImg, setSelectImg] = useState(undefined);
  const imgRef = useRef(null);

  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectImg) {
      const uploadImage = async () => {
        try {
          const formData = new FormData();
          formData.append("avatar", selectImg);

          const res = await fetch(`${URL_HOST}/api/user/updateImg`, {
            method: "PATCH",
            body: formData,
            credentials: "include",
          });

          if (!res.ok) throw new Error("Error fetching image");

          const data = await res.json();

          dispatch(updateImage(data));

          console.log(data);

          setSelectImg(undefined);
        } catch (error) {
          console.log(error);
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
      <form className="flex flex-col gap-4 mt-8">
        <img
          src={`${URL_HOST}/users/${user?.avatar}`}
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

        <input
          className="input"
          type="text"
          placeholder="username"
          id="username"
        />
        <input className="input" type="text" placeholder="email" id="email" />
        <input
          className="input"
          type="password"
          placeholder="password"
          id="password"
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
        </div>

        {/* sign in button */}
        <div className="flex justify-between gap-2 font-medium">
          <p
            // onClick={() => navigate("/signin")}
            className="text-red-700 hover:underline cursor-pointer"
          >
            Delete account
          </p>
          <p
            // onClick={() => navigate("/signin")}
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
