import { Router, Request, Response, NextFunction } from "express";
import { User } from "../mongoose/schemas/user.ts";
import { Types } from "mongoose";
import passport from "../strategies/localStrategy.ts";
import { userSchema, UserType } from "../../shared/schemas/userSchema.ts";
import { comparePassword, hashPassword } from "../../shared/utils/hash.ts";
import validateBody from "../middleware/validateBody.ts";
import checkForAuthentication from "../middleware/checkForAuthentication.ts";

const router = Router();

router.get(
  "/users/:id",
  checkForAuthentication,
  async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    try {
      const objectId = new Types.ObjectId(userId);
      const user = await User.findById(objectId);
      if (user) return res.send({ user });
      return res
        .status(404)
        .send({ error: `User with ID ${userId} not found` });
    } catch (err) {
      return res.status(400).send({ error: "Invalid ID" });
    }
  }
);

router.post(
  "/users/sign-up",
  validateBody(userSchema),
  async (req: Request, res: Response) => {
    const u: UserType = req.body;
    const existingUser = await User.findOne({ username: u.username });
    if (existingUser) {
      return res.status(400).send({ user: u, error: "Username taken" });
    }

    const hashedPass = await hashPassword(u.password);
    const newUser = new User({ username: u.username, password: hashedPass });

    try {
      const savedUser = await newUser.save();
      req.login(savedUser as any, (err: Error) => {
        if (err) {
          return res.status(500).send({ error: err.message });
        }
        return res.status(201).send({ username: savedUser.username });
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({ user: newUser, error: err.message });
      }
      return res.status(400).send({ user: newUser, error: err });
    }
  }
);

router.post(
  "/users/sign-in",
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", function (err: any, user: any) {
      if (err) {
        return res.status(400).send({ error: err });
      }
      if (!user) {
        return res.status(401).send({ error: "User login error" });
      }
      req.logIn(user, function (secondErr) {
        if (secondErr) {
          return res.status(500).send({ error: "Login failed" });
        }
        return next();
      });
    })(req, res, next);
  },
  (req: Request, res: Response) => {
    const u = req.user;
    req.isAuthenticated();
    if (u) {
      return res.send({
        username: u.username,
        msg: "Successful login",
      });
    }
  }
);

router.post(
  "/users/sign-in/status",
  checkForAuthentication,
  (req: Request, res: Response) => {
    return res.send({ user: req.user, msg: "Client authenticated" });
  }
);

router.post("/users/log-out", (req: Request, res: Response) => {
  if (!req.user) return res.status(401).send({ error: "Already logged out" });
  req.logout((err) => {
    if (err) return res.status(500).send({ error: "Logout failed" });
    res.send({ msg: "Logout successful" });
  });
});

router.patch(
  "/users/:id/change-password",
  checkForAuthentication,
  async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const oldPassword: string = req.body.oldPassword;
    const newPassword: string = req.body.newPassword;

    try {
      const objectId = new Types.ObjectId(userId);
      const hashedNewPassword = await hashPassword(newPassword);

      const user = await User.findById(objectId);
      if (!user) return res.status(404).send({ error: "User not found" });
      if (!(await comparePassword(oldPassword, user.password))) {
        return res.status(400).send({ error: "Old password doesn't match" });
      }

      user.password = hashedNewPassword;
      user.save();
      res.status(200).send({ msg: "Password updated successfully" });
    } catch (err) {
      console.error(err);
      return res.status(400).send({ error: "Invalid ID or other error" });
    }
  }
);

export default router;
