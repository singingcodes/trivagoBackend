import express from "express"
import createError from "http-errors"
import AccommodationModel from "./model.js"

import { hostOnlyMiddleware } from "../../auth/hosts.js"
import { JWTAuthMiddleware } from "../../auth/token.js"

const accommodationRouter = express.Router()

// POST WORKING!
accommodationRouter.post(
  "/",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const newPost = new AccommodationModel(req.body)
      const { _id } = await newPost.save()
      res.status(201).send({ _id })
    } catch (error) {
      next(error)
    }
  }
)

//GET WORKING!
accommodationRouter.get("/", async (req, res, next) => {
  try {
    const post = await AccommodationModel.find({})
    res.send(post)
  } catch (error) {
    next(error)
  }
})
// WORKS
accommodationRouter.get("/:Id", async (req, res, next) => {
  try {
    const post = await AccommodationModel.findById(req.params.Id)
    if (post) {
      res.send(post)
    } else {
      next(createError(404, `Post with id ${req.params.Id} not found!`))
    }
  } catch (error) {
    next(error)
  }
})
// Works!
accommodationRouter.put(
  "/:Id",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const updatedPost = await AccommodationModel.findByIdAndUpdate(
        req.params.Id,
        req.body,
        { new: true, runValidators: true }
      )
      if (updatedPost) {
        res.send(updatedPost)
      } else {
        next(createError(404, `Post with id ${req.params.Id} not found!`))
      }
    } catch (error) {
      next(error)
    }
  }
)
// WORKS!
accommodationRouter.delete(
  "/:postId",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const deletedPost = await AccommodationModel.findByIdAndDelete(
        req.params.postId
      )
      if (deletedPost) {
        res.status(204).send()
      } else {
        next(createError(404, `User with id ${req.params.postId} not found!`))
      }
    } catch (error) {
      next(error)
    }
  }
)

export default accommodationRouter
