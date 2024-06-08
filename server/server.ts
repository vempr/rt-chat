import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./strategies/localStrategy.ts";
import MongoStore from "connect-mongo";
import blogsRouter from "./routes/blogs.ts";
import usersRouter from "./routes/users.ts";
import catchError from "./middleware/catchError.ts";

const app = express();
const port = 5174;
const URI = process.env.VITE_MONGODB_URI as string;
const SECRET = process.env.VITE_SECRET as string;

mongoose
  .connect(URI)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.use(express.json({ limit: "4mb" }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser(SECRET));
app.use(
  session({
    secret: SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
    cookie: {
      sameSite: false,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(blogsRouter);
app.use(usersRouter);

app.use(catchError);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
