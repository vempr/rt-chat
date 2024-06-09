import { configureStore } from "@reduxjs/toolkit";
import blogsApi from "./features/blogsSlice";
import usersApi from "./features/usersSlice";

const store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogsApi.middleware, usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
