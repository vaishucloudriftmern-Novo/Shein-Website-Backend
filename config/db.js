const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vaishu:123@cluster0.6ojiblx.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB Connected 👍");
  } catch (err) {
    console.log("DB Error:", err);
  }
};

module.exports = connectDB;
