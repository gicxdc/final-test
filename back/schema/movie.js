import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  ID:{
    type:String,
    require:true,
    unique:true
  },
    name: {
    type: String,
    require:true,
    unique:true
  },
  time: {
    type: Number
  },
  year:{
    type:Number
  },
  image:{
    type:String
  },introduce:{
    type:String
  },
});

const movieModel = mongoose.model("Movie", movieSchema);

export default movieModel;