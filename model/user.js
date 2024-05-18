const mongoose = require("mongoose");

mongoose.connect(process.env.Mongooes);

const userschema = mongoose.Schema({
  username: String,
  number: String,
  email: String,
  password: String,
  posts: [{
    type: mongoose.Types.ObjectId,
    ref: "post",
  }],
  taka: {
    type:Number,
    default:"00.0",
  }
});

module.exports = mongoose.model("user", userschema);
