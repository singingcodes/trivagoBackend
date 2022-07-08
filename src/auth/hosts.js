import createHttpError from "http-errors";

export const hostOnlyMiddleware = (req, res, next) => {
  // This needs to be used AFTER the authentication middleware. It has only one job: checking the role of the current user

  if (req.user.role === "host") {
    next();
  } else {
    next(createHttpError(403, "Host only endpoint!"));
  }
};
