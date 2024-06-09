import { configureStore } from "@reduxjs/toolkit";
import blogsApi from "./api/blogsApi.ts";
import usersApi from "./api/usersApi.ts";
import blogsReducer from "./features/blogsSlice.ts";

const store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    blogs: blogsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogsApi.middleware, usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
