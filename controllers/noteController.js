const noteDao = require('../dao/noteDao');


const createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({ success: false, message: "Title,content and category is required" });
    }

    const note = await noteDao.createNote({ 
      title, 
      content, 
      category, 
      userId: req.user._id 
    });

    res.status(201).json({ success: true, message: "Note created successfully", note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLoginUserNotes = async (req, res) => {
  try {
    const notes = await noteDao.getNotesByUser(req.user.id);
    res.status(200).json({ 
      success: true, 
      message: "Notes fetched successfully", 
      notes 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteNote = async (req, res) => {
  try {
   const {id} = req.params || req.body;
   if(! id) return res.status(400).json({success : false, message : "Note ID is required"});
   await noteDao.deleteNote(id);
   res.status(200).json({success : true, message : "Note deleted successfully"});
  } catch (error) {
   res.status(500).json({success : false, message : error.message});
  }
 };


const updateNote = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "Note ID is required" });
    }

    const note = await noteDao.updateNote(id, req.body);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    res.status(200).json({ success: true, message: "Note updated successfully", note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getAllNotes = async (req, res) => {
  try {
    const notes = await noteDao.getAllNotes();
    res.status(200).json({ success: true, message: "Notes fetched successfully", notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


const searchNotes = async (req, res) => {
  try {
    const { title, category } = req.query;
    if(!title && !category){
      return res.status(400).json({ success: false, message: "Title or category is required" });
    }
    let notes;
    if(title && category) {
      notes = await noteDao.searchNotes(title, category, req.user.id);
      //  notes = await noteDao.searchNotes(title, category);
    } else if(title) {
      notes = await noteDao.searchNotes(title, '', req.user.id);
      //  notes = await noteDao.searchNotes(title, '');
    } else if(category) {
      notes = await noteDao.searchNotes('', category, req.user.id);
            // notes = await noteDao.searchNotes('', category);
    }
  
    res.status(200).json({ success: true, message: "Notes fetched successfully", notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const filterNotesByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    if(!category){
      return res.status(400).json({ success: false, message: "Category is required" });
    }
    // const notes = await noteDao.filterNotesByCategory(category);
    const notes = await noteDao.filterNotesByCategory(category, req.user.id);
    if(notes.length === 0){
      return res.status(404).json({ success: false, message: "No notes found for this category" });
    }
    res.status(200).json({ success: true, message: "Notes fetched successfully", notes });
  } catch (error) {
     return res.status(500).json({ success: false, message: error.message });
}
}

module.exports = { 
  createNote, 
  updateNote, 
  getAllNotes,
  searchNotes,
  filterNotesByCategory,
  getLoginUserNotes,
  deleteNote
}; 


