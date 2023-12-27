import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slice/userSlice";
import listingSlice from "./slice/listingSlice";
import userListSlice from "./slice/userListSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["listing"],
};

const rootReducer = combineReducers({
  user: userSlice,
  listing: listingSlice,
  userList: userListSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
