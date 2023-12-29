import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const [searchValue, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("search", searchValue);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchValueFromUrl = urlParams.get("search");
    if (searchValueFromUrl) {
      setSearch(searchValueFromUrl);
    }
  }, [searchValue]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-purple-100 sm:p-2 p-2 rounded-lg flex justify-between items-center shadow-inner"
    >
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent focus-within:outline-none w-32 sm:w-64"
        value={searchValue}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button>
        <FaSearch className="text-stone-800" />
      </button>
    </form>
  );
}
export default Searchbar;
