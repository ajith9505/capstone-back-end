//Importing
const mongoose = require('mongoose');

//Connect to MongoDB
const connectDB = async () => {
    await mongoose.
        connect(process.env.DB_URL);

    console.log("MongoDB Connected...")
}

module.exports = connectDB;