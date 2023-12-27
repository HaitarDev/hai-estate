import { Link } from "react-router-dom";
import { URL_HOST } from "../../Costant";
import { Listing } from "../../redux/slice/listingSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteListUser,
  setUserListError,
} from "../../redux/slice/userListSlice";

type Props = {
  list: Listing;
};
function List({ list }: Props) {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleDeleteList = async () => {
    const res = await fetch(`${URL_HOST}/api/listing/deleteList/${list._id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) dispatch(setUserListError("Failed to delete user list"));

    await res.json();

    dispatch(deleteListUser(list._id));
  };

  return (
    <div className="border  rounded-md shadow-sm">
      <div className="flex justify-between items-center p-2">
        <div className="flex flex-1 items-center gap-2">
          <Link to={`/listing/${list._id}`}>
            <img
              className=" rounded-lg cursor-pointer "
              width={100}
              src={`${URL_HOST}/listing/${list.images?.[0]}`}
              alt=""
            />
          </Link>
          <Link to={`/listing/${list._id}`}>
            <p className="text-lg font-semibold text-slate-700 cursor-pointer hover:underline-offset-4 hover:underline">
              {list.name}
            </p>
          </Link>
        </div>
        <div className="flex  gap-6 flex-col">
          <Link
            to={`/updateListing/${list._id}`}
            className="p-2 rounded-md border bg-yellow-400 opacity-80 hover:opacity-100 uppercase font-medium"
          >
            update
          </Link>
          <button
            onClick={() => setShowDelete((prev) => !prev)}
            className="p-2 rounded-md border bg-red-500 opacity-80 hover:opacity-100 uppercase font-medium"
          >
            delete
          </button>
        </div>
      </div>
      {showDelete ? (
        <div className="bg-red-600 w-full rounded-b-md">
          <button
            onClick={handleDeleteList}
            className=" text-start text-white p-1 font-medium "
          >
            delete confirmation
          </button>
        </div>
      ) : null}
    </div>
  );
}
export default List;
