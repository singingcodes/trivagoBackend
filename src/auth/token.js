import createHttpError from "http-errors";
import { verifyAccessToken } from "./tools.js";

export const JWTAuthMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    next(
      createHttpError(
        401,
        "Please provide Bearer Token in the authorization header!"
      )
    );
  } else {
    try {
      // 2. If authorization header is there we can extract the token from it (Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmJhYzg1NmRkMzM5YTBmNzU2OGVhNjEiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE2NTY0OTI5MTMsImV4cCI6MTY1NzA5NzcxM30.VdPVmNkUGOvSf4y39rMuXPI_aaafxexqU65Q2Jgbefo")
      const token = req.headers.authorization.replace("Bearer ", "");

      const payload = await verifyAccessToken(token);

      req.user = {
        _id: payload._id,
        role: payload.role,
      };

      next();
    } catch (error) {
      console.log(error);
      next(createHttpError(401, "Token not valid!"));
    }
  }
};
