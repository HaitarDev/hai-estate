import { createSlice } from "@reduxjs/toolkit";

export type Listing = {
  _id: string;
  name: string;
  description: string;
  address: string;
  type?: string;
  parking: boolean;
  furnished: boolean;
  offer: boolean;
  beds: number;
  baths: number;
  regularPrice: number;
  images: string[];
  userRef?: string;
};

export type ListingObj = {
  listing: Listing | null;
  error: string | "";
};

const initialState: ListingObj = {
  listing: null,
  error: "",
};

export const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setNewListing: (state, action) => {
      state.listing = action.payload;
      state.error = "";
    },
    setListingError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNewListing, setListingError } = listingSlice.actions;

export default listingSlice.reducer;
