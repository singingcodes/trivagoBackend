import createHttpError from "http-errors";
import { ObjectId } from "mongoose";
import { verifyAccessToken } from "./tools";
import { RequestHandler, Request } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    _id?: ObjectId;
    role?: string;
  };
}

export const JWTAuthMiddleware: RequestHandler = async (
  req: AuthenticatedRequest,
  res,
  next
) => {
  if (!req.headers.authorization) {
    next(
      createHttpError(
        401,
        "Please provide Bearer Token in the authorization header!"
      )
    );
  } else {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");

      const payload: any = await verifyAccessToken(token);
      if (payload) {
        req.user = {
          _id: payload._id,
          role: payload.role,
        };
        next();
      } else {
        console.log(" no payload");
      }
    } catch (error) {
      console.log(error);
      next(createHttpError(401, "Token not valid!"));
    }
  }
};