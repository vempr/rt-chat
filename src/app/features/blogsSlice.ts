import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BlogMongoType } from "../../../shared/schemas/blogSchema";

interface SliceState {
  blogs: BlogMongoType[];
}

const initialState: SliceState = {
  blogs: [],
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlogs: (state, action: PayloadAction<BlogMongoType[]>) => {
      // for storing blogs in cache when client uses pagination and wants to go to a page that they visited
      for (const blog of action.payload) {
        // @ts-ignore
        state.blogs.push(blog);
      }
    },
    clearBlogs: (state, _action) => {
      state.blogs = [];
    },
  },
});

export const { addBlogs, clearBlogs } = blogsSlice.actions;
export default blogsSlice.reducer;
