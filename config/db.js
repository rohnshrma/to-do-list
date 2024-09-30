import mongoose from "mongoose";
// export const connectDB = async () => {
//   try {
//     mongoose.connect("mongodb://localhost:27017/siddharthTDLDB");
//     console.log("Connected to DB");
//   } catch (err) {
//     console.log(err);
//   }
// };

const connectDB = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/siddharthTDLDB");
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
