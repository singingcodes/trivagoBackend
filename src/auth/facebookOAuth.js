// import passport from "passport"
// import FacebookStrategy from "passport-facebook"
// import { generateAccessTokenForGoogle } from "./tools.js"

// const facebookStrategy = new FacebookStrategy(
//   {
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3001/users/facebookRedirect",
//   },
//   async (_, __, profile, passportNext) => {
//     try {
//       console.log("PRofile ", profile)
//       const user = await UsersModel.findOne({ email: profile._json.email })
//     } catch (error) {
//       passportNext(error)
//     }
//   }
// )

// export default facebookStrategy
