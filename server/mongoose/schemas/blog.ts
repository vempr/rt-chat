import { Schema, model } from "mongoose";

const BlogSchema = new Schema({
  author: {
    type: Schema.Types.String,
    required: true,
  },
  title: {
    type: Schema.Types.String,
    required: true,
  },
  body: {
    type: Schema.Types.String,
    required: true,
  },
  thumbnail: {
    type: Schema.Types.String,
    required: false,
  },
  date: {
    type: Schema.Types.Date,
    required: true,
  },
  reactions: {
    type: {
      likes: {
        type: Schema.Types.Number,
        required: true,
      },
      dislikes: {
        type: Schema.Types.Number,
        required: true,
      },
    },
    _id: false,
    required: true,
  },
});

export const Blog = model("Blog", BlogSchema);
