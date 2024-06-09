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
      for (const blog of action.payload) {
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
