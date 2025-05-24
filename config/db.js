const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.DB_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }else{
      console.log('DB_URI is loaded properly');
    }

    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB; 