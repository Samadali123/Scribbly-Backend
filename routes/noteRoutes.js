const express = require('express');
const { 
  getLoginUserNotes, 
  createNote, 
  updateNote, 
  deleteNote,
  getAllNotes,
  searchNotes,
  filterNotesByCategory
} = require('../controllers/noteController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


// get all notes
router.get('/all', getAllNotes);


router.use(authMiddleware);


// Create a new note
router.post('/create', createNote);


// Get all notes by authenticated User
router.get('/user', getLoginUserNotes);


// Update a note
router.put('/update', updateNote);

// Delete a note
router.delete('/delete/:id', deleteNote);


// get Notes by title or category
router.get("/search", searchNotes);

// get notes filter by category
router.get("/category", filterNotesByCategory);

module.exports = router; 