import { useEffect, useState } from "react";
import { URL_HOST } from "../../Costant";

import List from "./List";

type Props = {
  userId: string | undefined;
  isShow: boolean;
};
export default function UserListing({ userId, isShow }: Props) {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isShow) {
      const showListing = async () => {
        setLoading(true);
        setError("");
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
          setUserList(data);
          setError("");
          setLoading(false);
        } catch (err) {
          setError(err.message);
        }
      };
      showListing();
    }
  }, [isShow, userId]);

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
