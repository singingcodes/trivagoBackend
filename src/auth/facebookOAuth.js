import passport from "passport";
import FacebookStrategy from "passport-facebook";
import { generateAccessTokenForGoogle } from "./tools.js";

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3001/users/facebookRedirect",
  },
  async (_, __, profile, passportNext) => {
    try {
      // This callback function is executed when Google sends us a successfull response back
      // Here we are receiving some informations about the user from Google (scopes --> email, profile)
      console.log("PRofile ", profile);

      const user = await UsersModel.findOne({ email: profile._json.email });

      /*   if (user) {
        const token = await generateAccessTokenForGoogle(user);
        passportNext(null, { token });
      } else {
        const { given_name, family_name, email } = profile._json;

        const newUser = new UsersModel({
          firstName: given_name,
          lastName: family_name,
          email,
          googleID: profile.id,
        });
        const createdUser = await newUser.save();
        const { token } = await generateAccessTokenForGoogle(createdUser);
        passportNext(null, { token });
      } */
    } catch (error) {
      passportNext(error);
    }
  }
);

export default facebookStrategy;
