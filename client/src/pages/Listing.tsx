import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_HOST } from "../Costant";
import { Listing } from "../redux/slice/listingSlice";
import { Swiper, SwiperSlide } from "swiper/react";

import { register } from "swiper/element/bundle";
register();
import "swiper/css/bundle";

function Listing() {
  const [listing, setListing] = useState<Listing | null>(null);
  const params = useParams().id;

  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`${URL_HOST}/api/listing/${params}`, {
        credentials: "include",
      });
      if (!res.ok) console.log("res not ok");
      const data = await res.json();
      setListing(data);
    };
    fetchListing();
  }, [params]);

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
    </main>
  );
}
export default Listing;
