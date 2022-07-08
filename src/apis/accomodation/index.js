import express from "express";
import createError from "http-errors";
import AccomodationModel from "./model.js";

import { hostOnlyMiddleware } from "../../auth/hosts.js";
import { JWTAuthMiddleware } from "../../auth/token.js";

const accomodationRouter = express.Router();

// POST WORKING!
accomodationRouter.post(
  "/",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const newPost = new AccomodationModel(req.body);
      const { _id } = await newPost.save();
      res.status(201).send({ _id });
    } catch (error) {
      next(error);
    }
  }
);

//GET WORKING!
accomodationRouter.get("/", async (req, res, next) => {
  try {
    const post = await AccomodationModel.find({});
    res.send(post);
  } catch (error) {
    next(error);
  }
});
// WORKS
accomodationRouter.get("/:Id", async (req, res, next) => {
  try {
    const post = await AccomodationModel.findById(req.params.Id);
    if (post) {
      res.send(post);
    } else {
      next(createError(404, `Post with id ${req.params.Id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
// Works!
accomodationRouter.put(
  "/:Id",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const updatedPost = await AccomodationModel.findByIdAndUpdate(
        req.params.Id,
        req.body,
        { new: true, runValidators: true }
      );
      if (updatedPost) {
        res.send(updatedPost);
      } else {
        next(createError(404, `Post with id ${req.params.Id} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);
// WORKS!
accomodationRouter.delete(
  "/:postId",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const deletedPost = await AccomodationModel.findByIdAndDelete(
        req.params.postId
      );
      if (deletedPost) {
        res.status(204).send();
      } else {
        next(createError(404, `User with id ${req.params.postId} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

export default accomodationRouter;
