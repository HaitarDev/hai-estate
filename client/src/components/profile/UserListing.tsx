import { useEffect } from "react";
import { URL_HOST } from "../../Costant";

import List from "./List";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUserList } from "../../redux/slice/userListSlice";
import { RootState } from "../../redux/store";
import { setListingError } from "../../redux/slice/listingSlice";

type Props = {
  userId: string | undefined;
  isShow: boolean;
};
export default function UserListing({ userId, isShow }: Props) {
  const dispatch = useDispatch();
  const {
    listing: userList,
    error,
    isLoading,
  } = useSelector((state: RootState) => state.userList);

  useEffect(() => {
    if (isShow) {
      const showListing = async () => {
        dispatch(setLoading(true));
        try {
          const res = await fetch(`${URL_HOST}/api/user/myListing/${userId}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) console.log("response failed", res.ok);

          const data = await res.json();
          dispatch(setUserList(data));
        } catch (err) {
          dispatch(setListingError(err.message));
        }
      };
      showListing();
    }
  }, [isShow, userId, dispatch]);

  console.log(userList);
  return (
    <div className="flex flex-col gap-4 mt-4">
      {isShow ? (
        isLoading ? (
          <p className="text-center font-medium"> Loading...</p>
        ) : (
          userList?.map((list) => <List list={list} key={list._id} />)
        )
      ) : null}
    </div>
  );
}
