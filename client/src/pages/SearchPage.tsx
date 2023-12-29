import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../redux/slice/userSlice";
import { URL_HOST } from "../Costant";

export default function SearchPage() {
  const navigate = useNavigate();
  const [listingData, setListingData] = useState([]);
  console.log(listingData);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebardata, setSidebardata] = useState({
    search: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const handleChange = (e) => {
    if (e.target.id === "search") {
      setSidebardata({ ...sidebardata, search: e.target.value });
    }
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (
      e.target.id === "offer" ||
      e.target.id === "parking" ||
      e.target.id === "furnished"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0];
      const order = e.target.value.split("_")[1];
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const URLparams = new URLSearchParams();
    URLparams.set("search", sidebardata.search);
    URLparams.set("type", sidebardata.type);
    URLparams.set("parking", sidebardata.parking.toString());
    URLparams.set("furnished", sidebardata.furnished.toString());
    URLparams.set("offer", sidebardata.offer.toString());
    URLparams.set("sort", sidebardata.sort);
    URLparams.set("order", sidebardata.order);

    const searchQuery = URLparams.toString();

    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const URLparams = new URLSearchParams(location.search);
    const searchTermFromUrl = URLparams.get("search");
    const typeFromUrl = URLparams.get("type");
    const parkingFromUrl = URLparams.get("parking");
    const furnishedFromUrl = URLparams.get("furnished");
    const offerFromUrl = URLparams.get("offer");
    const sortFromUrl = URLparams.get("sort");
    const orderFromUrl = URLparams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        search: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListing = async () => {
      const searchQuery = URLparams.toString();
      setLoading(true);
      const res = await fetch(`${URL_HOST}/api/listing/get?${searchQuery}`);
      if (!res.ok) console.log("something wrong : ", res.status);

      const data = await res.json();
      setListingData(data);
      setIsLoading(false);
    };

    fetchListing();
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label htmlFor="search" className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search..."
              className="w-full input"
              onChange={handleChange}
              value={sidebardata.search}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <p className="font-semibold">Type:</p>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <label htmlFor="all">Rent & Sale</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <p className="font-semibold">Amenities:</p>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
              onChange={handleChange}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to hight</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {/* {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}
