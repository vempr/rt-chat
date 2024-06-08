import { NextFunction, Request, Response } from "express";

export default function checkForAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send({ error: "Client unauthenticated" });
}
