const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const { ApolloError, AuthenticationError } = require('apollo-server-errors')
const User = require('../../models/User');

module.exports = {
  Mutation: {
    async registerUser(_, {registerInput: {username, email, password} }) {
      // See if an old useer exists with email attempting to register
        const alreadyUser = await User.findOne({ email });
      // Throw error if that user exists
  if (alreadyUser) {
    throw new ApolloError('A user is already registered with this email' + email, 'USER_ALREADY_EXIST')
  }

      // Encrypt password
      let encrytedPassword = await bcrypt.hash(password, 10); 

      // Build out mongoose 
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encrytedPassword
      });

      // Create JWT {attach to our User model)
      const token = jwt.sign(
        { user_id: newUser._id, email },
        "UNSAFE_STRING",
        {
          expiresIn: "3h"
        }
      );

      newUser.token = token;

      // Save user in MongoDB
      const res = await newUser.save();
        return {
          id: res.id,
          ...res._doc
        };
    },
    async loginUser(_, {loginInput: {email, password} }) {
      // See if a user exists with the email
      const user = await User.findOne({ email });
      // Check if the entered password equals the encrypted password
      if (user && (await bcrypt.compare(password, user.model))) {
        //Create a New token
        const token = jwt.sign(
          { user_id: newUser._id, email },
          "UNSAFE_STRING",
          {
            expiresIn: "3h"
          }
        );

        user.token =token;
      } else {
        // If user dosen't exist, return error
        throw new AuthenticationError("Incorrcet credentials")
      }
    }
  },
  Query: {
    user: (_, {ID}) => User.findById(ID)
  }
}