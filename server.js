// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const noteRoutes = require('./routes/noteRoutes');
// const errorMiddleware = require('./middlewares/errorMiddleware');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const cors = require('cors');

// // Load environment variables
// dotenv.config();

// connectDB();

// const app = express();

// app.use(express.static("dist"));

// app.use(cors({
//   origin: true, // dynamically reflect origin
//   credentials: true,
// }));

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());


// app.get("/", (req, res) => {
//   res.send("API is working fine");
// });
// app.use('/api/auth', authRoutes);
// app.use('/api/notes', noteRoutes);

// app.all('*', (req, res) => {
//   res.status(404).json({ success: false, message: req.url + " not found"  });
// });

// app.use(errorMiddleware);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 



const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to DB
connectDB();

// Initialize app
const app = express();

// Middlewares
app.use(cors({
  origin: true, // Reflect request origin dynamically
  credentials: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Serve frontend static files
const frontendPath = path.join(__dirname, 'dist');
app.use(express.static(frontendPath));

// SPA fallback: serve index.html for unmatched frontend routes
app.get('*', (req, res) => {
  // Serve React/Vite's index.html
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error middleware
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
