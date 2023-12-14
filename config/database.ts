import config from "config";
import { connect } from "mongoose";

const connectDB = async () => {
  try {
    console.log("Trying to estabilish connection to database..");
    const mongoURI: string = config.get("mongoURI");
    await connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};


export default connectDB;
