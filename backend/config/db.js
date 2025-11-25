const mongoose = require("mongoose");

const connectToDatabase = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB successfully 👻");
    })
    .catch((err) => console.log(err));
};

module.exports = connectToDatabase;
