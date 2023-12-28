const mongoose = require("mongoose");
require('dotenv').config();

const dbConnect = async function() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected successfully!');
  } catch (err){
    console.log('Connection Failed!', err.message);
  }
};

dbConnect();
