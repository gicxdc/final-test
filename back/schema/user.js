import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require:true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  }
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;