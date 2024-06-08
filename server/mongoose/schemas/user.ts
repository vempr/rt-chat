import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
});

export const User = model("User", UserSchema);
