import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { fromError } from "zod-validation-error";

const validateBody = (schema: ZodObject<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
    } catch (err) {
      const validationError = fromError(err);
      return res
        .status(400)
        .send({ user: req.body, error: validationError.toString() });
    }
    next();
  };
};

export default validateBody;
