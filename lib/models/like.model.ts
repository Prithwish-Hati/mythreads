import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  threadId: {
    type: mongoose.Schema.Types.ObjectId, //For storing unique values of the references of another model named Thread
    ref: "Thread",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
const Like = mongoose.model("Like", likeSchema);

export default Like;
