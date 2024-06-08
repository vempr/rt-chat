import { NextFunction, Request, Response } from "express";

const catchError = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res.status(500).send({ error: err.message });
};

export default catchError;
