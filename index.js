
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { default: mongoose } = require("mongoose");

const MONGODB = "mongodb+srv://yusluv124:jolayemi@cluster0.suakkk4.mongodb.net/"

const server = new AppoloServer({
  typeDefs, resolvers
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
  .then(() => {
    console.log("MongoDB Connected");
    return server.linsten({port: 5000});
  })
  .then((res) => {
      console.log(`Server running at ${res.url}`)
  });