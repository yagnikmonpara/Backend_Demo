import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const encodedPassword = encodeURIComponent("database");
    const mongoUrlWithEncodedPassword = process.env.MONGO_URL.replace("database", encodedPassword);

    const conn = await mongoose.connect(mongoUrlWithEncodedPassword, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`Connected To MongoDB Database ${conn.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.error(`Error in MongoDB ${error}`.bgRed.white);
  }
};

export default connectDB;