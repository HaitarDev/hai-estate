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
  listing: Listing[] | null;
  error: string | "";
  isLoading: boolean;
};

const initialState: ListingObj = {
  listing: null,
  error: "",
  isLoading: false,
};

export const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.listing = action.payload;
      state.error = "";
      state.isLoading = false;
    },
    setUserListError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = "";
    },
    deleteListUser: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.listing = (state.listing || [])?.filter(
        (list) => list._id !== action.payload
      );
    },
    deleteListImg: (state, action) => {
      const listingToUpdate = state.listing?.find(
        (list) => list._id === action.payload.id
      );

      if (listingToUpdate) {
        const updatedImages = listingToUpdate.images.filter(
          (img) => img !== action.payload.img
        );

        const updatedListings = (state.listing || [])?.map((list) =>
          list._id === action.payload.id
            ? { ...list, images: updatedImages }
            : list
        );

        state.listing = updatedListings;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserList,
  setUserListError,
  setLoading,
  deleteListUser,
  deleteListImg,
} = userListSlice.actions;

export default userListSlice.reducer;
