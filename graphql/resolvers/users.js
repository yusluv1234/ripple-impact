const User = require('../../models/User');

module.exports = {
  Mutation: {
    async registerUser(_, {registerInput: {username, email, password} }) {
      // See if an old useer exists with email attempting to register

      // Throw error if that user exists

      // Encrypt password

      // Build out mongoose 
      // var Schema = mongoose.Schema;
      
      // var SomeModelSchema = new Schema({
      // mongoose.connect(mongoDB, { useNewUrlParser: true });
      //     a_string: String,
      //      a_date: Date
      // });
      // Compile model from schema
      // var SomeModel = mongoose.model('SomeModel', SomeModelSchema );

      // Create JWT {attach to our User model)
    }
  },
}