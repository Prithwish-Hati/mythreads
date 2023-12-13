import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId, //For storing unique values of the references of another model named Thread
      ref: "Thread",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
});

const User =
  mongoose.models.User || // Every second time upon calling User, it will create user based on the existing mongoose model
  mongoose.model("User", userSchema); //First time when mongoose.models.user doesn't exist it's going to create this mongoose model

export default User;
