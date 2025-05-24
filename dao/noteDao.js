const Note = require('../models/Note');

const createNote = (data) => Note.create(data);

const getNotesByUser = (userId) => Note.find({ userId });

const updateNote = (id, data) => Note.findByIdAndUpdate(id, data, { new: true });

const deleteNote = (id) => Note.findByIdAndDelete(id);

const getAllNotes = () => Note.find();

// const searchNotes = async (title, category) => {
//   try {
//     if(!title && !category){
//       throw new Error("Title or category is required");
//     }
//     let notes;
//     if(title && category) {
//       notes = await Note.find({
//         $or: [
//           { title: { $regex: title, $options: 'i' } },
//           { category: { $regex: category, $options: 'i' } }
//         ]
//       });
//     } else if(title) {
//       notes = await Note.find({ title: { $regex: title, $options: 'i' } });
//     } else if(category) {
//       notes = await Note.find({ category: { $regex: category, $options: 'i' } });
//     }
//     return notes;
//   } catch (error) {
//     throw error;
//   }
// }

// const filterNotesByCategory = async (category) => {
//   try {
//     const notes = await Note.find({ category: { $regex: category, $options: 'i' } });
//      return notes;
//   } catch (error) {
//     throw error;
//   }
// }


const searchNotes = async (title, category, userId) => {
  try {
    if (!title && !category) {
      throw new Error("Title or category is required");
    }

    let query = { userId }; // filter by logged-in user's notes

    if (title && category) {
      query.$or = [
        { title: { $regex: title, $options: 'i' } },
        { category: { $regex: category, $options: 'i' } }
      ];
    } else if (title) {
      query.title = { $regex: title, $options: 'i' };
    } else if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    const notes = await Note.find(query);
    return notes;
  } catch (error) {
    throw error;
  }
};

const filterNotesByCategory = async (category, userId) => {
  try {
    const notes = await Note.find({
      category: { $regex: category, $options: 'i' },
      userId: userId, // assuming the field storing user reference is named 'user'
    });
    return notes;
  } catch (error) {
    throw error;
  }
};


module.exports = { 
  createNote, 
  updateNote, 
  deleteNote,
  getAllNotes,
  getNotesByUser, 
  searchNotes,
  filterNotesByCategory
}; 