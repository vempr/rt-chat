import { Schema, Types, model } from "mongoose";

const BlogSchema = new Schema({
  author: {
    type: {
      _id: {
        type: Types.ObjectId,
        required: true,
      },
      username: {
        type: Schema.Types.String,
        required: true,
      },
    },
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
      likes: [
        {
          type: Types.ObjectId,
          required: true,
        },
      ],
      dislikes: [
        {
          type: Types.ObjectId,
          required: true,
        },
      ],
    },
    _id: false,
    required: true,
  },
});

export const Blog = model("Blog", BlogSchema);
