import { useForm, SubmitHandler } from "react-hook-form";

import { setListingError, setNewListing } from "../redux/slice/listingSlice";
import { URL_HOST } from "../Costant";

import { ChangeEvent, useState } from "react";

export type Inputs = {
  name: string;
  description: string;
  address: string;
  sell: boolean;
  rent: boolean;
  parking: boolean;
  furnished: boolean;
  offer: boolean;
  beds: number;
  baths: number;
  regularPrice: number;
};

function CreateListing() {
  const [imagesName, setImagesName] = useState<string[]>([]);

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Inputs>();

  const handleImgChange = (e: ChangeEvent) => {
    setImagesName(e.target.files);
  };
  const handleSubmitImages = (e: SubmitEvent) => {
    e.preventDefault();
    const arr = Object.values(imagesName);
    if (arr.length > 6) {
      console.log("6 images");
      setError("You have the right only for 6 images .");
    } else {
      const newImages: string[] = arr.map((img) => img.name);

      setImagesName(newImages);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("regularPrice", data.regularPrice.toString());
    formData.append("beds", data.beds.toString());
    formData.append("baths", data.baths.toString());
    formData.append("offer", data.offer.toString());
    formData.append("furnished", data.furnished.toString());
    formData.append("parking", data.parking.toString());

    formData.append("type", data.sell ? "sell" : data.rent ? "rent" : "rent");

    for (const file of imagesName) {
      formData.append("images", file);
    }

    try {
      const res = await fetch(`${URL_HOST}/api/listing`, {
        body: formData,
        credentials: "include",
        method: "POST",
      });

      if (!res.ok) throw new Error("Your data is invalid");

      const listing = await res.json();

      reset();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <main className="p-4 my-16 max-w-lg sm:max-w-4xl mx-auto">
      <h1 className="font-semibold text-3xl sm:text-4xl text-center text-slate-900 mb-10">
        Create a Listing
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-4"
      >
        {/* left */}
        <div className="flex flex-col flex-1 gap-8">
          {/* type : text */}
          <div className="flex flex-col gap-4 border-b pb-4 border-gray-200 ">
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="input"
              {...register("name")}
              disabled={isSubmitting}
              required
            />
            <textarea
              id="description"
              placeholder="Description"
              className="input"
              {...register("description")}
              disabled={isSubmitting}
              required
            />
            <input
              type="text"
              id="address"
              placeholder="Address"
              className="input"
              {...register("address")}
              disabled={isSubmitting}
              required
            />
          </div>
          {/* type : checkbox */}
          <div className="flex  gap-4 flex-wrap border-b pb-4 border-gray-200">
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="sell"
                className="w-5"
                {...register("sell")}
                disabled={isSubmitting}
              />
              <label htmlFor="sell" className="font-medium">
                Sell
              </label>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="rent"
                className="w-5 "
                {...register("rent")}
                disabled={isSubmitting}
              />
              <label htmlFor="rent" className="font-medium">
                Rent
              </label>
            </div>

            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                {...register("parking")}
                disabled={isSubmitting}
              />
              <label htmlFor="parking" className="font-medium">
                Parking Spot
              </label>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 "
                {...register("furnished")}
                disabled={isSubmitting}
              />
              <label htmlFor="furnished" className="font-medium">
                Furnished
              </label>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="offer"
                className="w-5 "
                {...register("offer")}
                disabled={isSubmitting}
              />
              <label htmlFor="offer" className="font-medium">
                Offer
              </label>
            </div>
          </div>
          {/* type: numbers */}
          <div className="flex flex-col gap-4 ">
            <div className="flex  gap-8">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="beds"
                  min={1}
                  max={12}
                  className="input w-24"
                  {...register("beds", {
                    min: 1,
                    max: 12,
                  })}
                  disabled={isSubmitting}
                  required
                />
                <label htmlFor="beds" className="font-meduim">
                  Beds
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="baths"
                  className="input w-24"
                  min={1}
                  max={3}
                  {...register("baths", { min: 1, max: 3 })}
                  disabled={isSubmitting}
                  required
                />
                <label htmlFor="baths" className="font-meduim">
                  Baths
                </label>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  className="input w-36"
                  min={10}
                  {...register("regularPrice", { min: 10 })}
                  disabled={isSubmitting}
                  required
                />
                <label
                  htmlFor="regularPrice"
                  className="font-meduim text-center"
                >
                  Regular Price <br />
                  <span className="text-sm"> ($ / Month)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex flex-col gap-4  border-b pb-4 border-gray-200">
            <p className="font-semibold">
              Images:{" "}
              <span className="font-medium text-gray-500">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-4">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                className="px-4 py-3 border border-gray-200 rounded-sm"
                onChange={handleImgChange}
                disabled={isSubmitting}
              />
              <button
                className="px-4 py-3 text-violet-600 border font-medium border-violet-600 rounded-md uppercase hover:bg-violet-500 hover:text-white transition-all disabled:opacity-70"
                disabled={isSubmitting}
                type="button"
                onClick={handleSubmitImages}
              >
                Upload
              </button>
            </div>
          </div>
          <button
            className="cursor-pointer bg-violet-700 text-white py-4 rounded-lg text-lg font-medium uppercase w-full hover:opacity-95 hover:transition-colors disabled:opacity-70 text-center  "
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Create listing"}
          </button>

          <p className="font-medium text-red-600 text-center">
            {error ? error : null}{" "}
          </p>
        </div>
      </form>
    </main>
  );
}
export default CreateListing;
