const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Load environment variables
dotenv.config();

connectDB();

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
  origin: 'https://scribbly-indol.vercel.app',
  credentials: false
}))


app.get("/api", (req, res) => {
  res.send("API is working");
});
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: req.url + " not found"  });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 