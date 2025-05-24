const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Load environment variables
dotenv.config();

// // Check required environment variables
// const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
// const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

// if (missingEnvVars.length > 0) {
//   console.error('Missing required environment variables:', missingEnvVars.join(', '));
//   process.exit(1);
// }

// Connect to MongoDB
connectDB();

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: req.url + " not found"  });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 