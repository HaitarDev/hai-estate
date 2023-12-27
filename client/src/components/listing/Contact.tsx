import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL_HOST } from "../../Costant";
interface Props {
  userRef: string | undefined;
}
interface Data {
  username: string;
  email: string;
  id: string;
}
function Contact({ userRef }: Props) {
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setError("");
      const res = await fetch(`${URL_HOST}/api/user/${userRef}`, {
        credentials: "include",
      });
      if (!res.ok) setError("Could not contact this user!");
      const data = await res.json();
      setData(data);
    };
    fetchUserData();
  }, [userRef]);

  return (
    <div>
      <Link
        to={`mailto:${data?.email}`}
        className="uppercase px-10 py-3 bg-yellow-500/70 rounded-md text-slate-800 hover:bg-yellow-500 font-semibold transition"
      >
        Contact !
      </Link>
      <p className="mt-2 text-red-600 font-meduim">{error ? error : null}</p>
    </div>
  );
}
export default Contact;
