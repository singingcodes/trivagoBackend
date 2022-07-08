import express from "express"
import userModel from "./model"
import AccommodationModel from "../accommodation/model"
import createError from "http-errors"
import passport from "passport"
import { JWTAuthMiddleware } from "../../auth/token"
import { generateAccessToken } from "../../auth/tools"
import { hostOnlyMiddleware } from "../../auth/hosts"

const userRouter = express.Router()



userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await userModel.checkCredentials(email, password)

    if (user) {
      const accessToken = await generateAccessToken({ _id: user._id, role: user.role })
      res.send({ accessToken })
    } else {
      next(createError(401, "Credentials are not ok!"))
    }
  } catch (error) {
    next(error)
  }
})

// POST // MAKING A NEW USER
userRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = new userModel(req.body)
    const { _id } = await newUser.save()
    res.status(201).send({ _id })
  } catch (err) {
    next(err)
  }
})
// Working!
userRouter.get("/me", JWTAuthMiddleware, async (req:any, res, next) => {
  try {
    const accommodation = await AccommodationModel.find({
      user: req.user._id.toString(),
    })

    res.send(accommodation)
  } catch (error) {
    next(error)
  }
})

userRouter.put("/me", JWTAuthMiddleware, async (req:any, res, next) => {
  try {
    const modifiedUser = await userModel.findByIdAndUpdate(
       req.user._id,
      req.body,
      { new: true }
    )
    res.send(modifiedUser)
  } catch (error) {
    next(error)
  }
})

userRouter.delete("/me", JWTAuthMiddleware, async (req:any, res, next) => {
  try {
    await userModel.findByIdAndDelete(req.user._id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

// GET /users
userRouter.get(
  "/",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const users = await userModel.find()
      res.send(users)
    } catch (err) {
      next(err)
    }
  }
)

// GET /users/:userId
userRouter.get("/:userId", hostOnlyMiddleware, async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.userId)
    if (!user) {
      next(createError(404, `User with id ${req.params.userId} not found!`))
    }
    res.send(user)
  } catch (err) {
    next(err)
  }
})

// PUT /users/:userId
/* userRouter.put("/:userId", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      next(createError(404, `User with id ${req.params.userId} not found!`));
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
}); */
// DELETE /users/:userId
userRouter.delete(
  "/:userId",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const user = await userModel.findByIdAndDelete(req.params.userId)
      if (!user) {
        next(createError(404, `User with id ${req.params.userId} not found!`))
      }
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
)

export default userRouter
