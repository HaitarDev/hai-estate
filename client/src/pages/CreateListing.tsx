function CreateListing() {
  return (
    <main className="p-4 my-16 max-w-lg sm:max-w-4xl mx-auto">
      <h1 className="font-semibold text-3xl sm:text-4xl text-center text-slate-900 mb-10">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        {/* left */}
        <div className="flex flex-col flex-1 gap-8">
          {/* type : text */}
          <div className="flex flex-col gap-4 border-b pb-4 border-gray-200 ">
            <input type="text" id="name" placeholder="Name" className="input" />
            <textarea
              id="description"
              placeholder="Description"
              className="input"
            />
            <input
              type="text"
              id="address"
              placeholder="Address"
              className="input"
            />
          </div>
          {/* type : checkbox */}
          <div className="flex  gap-4 flex-wrap border-b pb-4 border-gray-200">
            <div className="flex gap-2 ">
              <input type="checkbox" name="sell" id="sell" className="w-5 " />
              <label htmlFor="sell" className="font-medium">
                Sell
              </label>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" name="rent" id="rent" className="w-5 " />
              <label htmlFor="rent" className="font-medium">
                Rent
              </label>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5 "
              />
              <label htmlFor="parking" className="font-medium">
                Parking Spot
              </label>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5 "
              />
              <label htmlFor="furnished" className="font-medium">
                Furnished
              </label>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" name="offer" id="offer" className="w-5 " />
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
                  className="input w-24"
                  min={1}
                  max={12}
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
                name="images"
                id="images"
                multiple
                accept="image/*"
                className="px-4 py-3 border border-gray-200 rounded-sm  "
              />
              <button className="px-4 py-3 text-violet-600 border font-medium border-violet-600 rounded-md uppercase hover:bg-violet-500 hover:text-white transition-all">
                Upload
              </button>
            </div>
          </div>
          <button className="cursor-pointer bg-violet-700 text-white py-4 rounded-lg text-lg font-medium uppercase w-full hover:opacity-95 hover:transition-colors disabled:opacity-80 text-center">
            Create listing
          </button>
        </div>
      </form>
    </main>
  );
}
export default CreateListing;
