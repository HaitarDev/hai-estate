import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_HOST } from "../Costant";
import { Listing } from "../redux/slice/listingSlice";
import { Swiper, SwiperSlide } from "swiper/react";

import { IoLocationSharp, IoBedSharp } from "react-icons/io5";

import { FaBath, FaParking } from "react-icons/fa";
import { LuLampFloor } from "react-icons/lu";

import { register } from "swiper/element/bundle";
register();
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Contact from "../components/listing/Contact";

function Listing() {
  const [listing, setListing] = useState<Listing | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const params = useParams().id;
  const id = useSelector((state: RootState) => state.user.user?._id);

  useEffect(() => {
    const fetchListing = async () => {
      setError("");
      setLoading(true);
      const res = await fetch(`${URL_HOST}/api/listing/${params}`, {
        credentials: "include",
      });
      if (!res.ok) setError("Couldn't download this listing !");
      const data = await res.json();
      setListing(data);
      setLoading(false);
    };
    fetchListing();
  }, [params]);

  if (loading)
    return <p className=" my-7 text-center text-xl font-medium">Loading ...</p>;

  if (error)
    return (
      <p className="my-7 text-center text-xl font-medium text-red-600">
        {error}
      </p>
    );

  return (
    <main>
      {/* slider */}
      <div>
        <Swiper navigation autoplay={{ delay: 3000 }} loop={true}>
          {listing?.images.map((img) => (
            <SwiperSlide key={img}>
              <img
                src={`${URL_HOST}/listing/${img}`}
                className=" object-cover bg-no-repeat bg-center w-full h-80"
              ></img>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* informations  */}
      <div className="container my-7  px-4   flex flex-col gap-8">
        <h1 className="font-semibold text-3xl text-slate-800">
          {listing?.name}-{" "}
          {listing?.type === "rent"
            ? `$${listing.regularPrice}/month`
            : `${listing?.regularPrice}`}{" "}
        </h1>

        <div className="flex flex-col gap-4 ">
          <div className="flex items-center gap-1 font-medium  text-slate-700/90">
            <span className="text-violet-700">
              <IoLocationSharp />
            </span>
            <p>{listing?.address}</p>
          </div>
          <div>
            <p className="sm:w-[20%] text-center font-medium shadow-inner drop-shadow-xl px-4 py-2 rounded-md bg-violet-600 text-white">
              {listing?.type === "rent" ? "For Rent" : "For Sell"}
            </p>
          </div>
          <div className=" font-medium">
            {" "}
            <span className="font-semibold"> Description </span> -
            <span className="text-slate-700/90"> {listing?.description}</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-violet-700 font-medium">
              <span className="text-lg">
                <IoBedSharp />
              </span>
              <span>{listing?.beds} beds</span>
            </div>
            <div className="flex items-center gap-2 text-violet-700 font-medium">
              <span className="text-lg">
                <FaBath />
              </span>
              <span>{listing?.baths} baths</span>
            </div>
            <div className="flex items-center gap-2 text-violet-700 font-medium">
              <span className="text-lg">
                <FaParking />
              </span>
              <span>{listing?.parking ? "Parking" : "No Parking"}</span>
            </div>
            <div className="flex items-center gap-2 text-violet-700 font-medium">
              <span className="text-lg">
                <LuLampFloor />
              </span>

              <span>{listing?.furnished ? "Furnished" : "No Furnished"}</span>
            </div>
          </div>
        </div>

        <div>
          {id !== listing?.userRef ? (
            <Contact userRef={listing?.userRef} />
          ) : null}
        </div>
      </div>
    </main>
  );
}
export default Listing;
