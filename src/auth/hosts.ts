import createHttpError from "http-errors";
import { RequestHandler, Request } from "express"
import { ObjectId } from "mongoose";

interface AuthenticatedRequest extends Request {
  user?: {
    role?: string | undefined;
  }
}

export const hostOnlyMiddleware:RequestHandler = (req:AuthenticatedRequest, res, next) => {
  // This needs to be used AFTER the authentication middleware. It has only one job: checking the role of the current user

  if (req.user?.role === "host") {
    next();
  } else {
    next(createHttpError(403, "Host only endpoint!"));
  }
};
