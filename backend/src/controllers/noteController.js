const Note = require("../models/Note");

// Crear nota
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;  // Viene del middleware

    const newNote = new Note({
      title,
      content,
      userId,
    });

    await newNote.save();

    res.status(201).json({
      message: "Nota creada exitosamente",
      note: newNote,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las notas del usuario
const getNotes = async (req, res) => {
  try {
    const userId = req.userId;

    const notes = await Note.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una nota por ID
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const note = await Note.findOne({ _id: id, userId });

    if (!note) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }

    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar nota
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.userId;

    const note = await Note.findOneAndUpdate(
      { _id: id, userId },
      { title, content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }

    res.status(200).json({
      message: "Nota actualizada exitosamente",
      note,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar nota
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const note = await Note.findOneAndDelete({ _id: id, userId });

    if (!note) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }

    res.status(200).json({ message: "Nota eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
