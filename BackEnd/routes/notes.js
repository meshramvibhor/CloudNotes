const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Endpoint - 1
// Fetching all note of a user using: GET "api/note/allnotes" .  log in required
//adding middleware fetchusr to get id from jwt-token
router.get("/allnotes", fetchuser, async (req, res) => {
  try {
    //getting all notes of that particular user
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.msg);
    res.status(500).send("Internal error occured");
  }
});


//Endpoint - 2
// Creating a new note of a user using: Post "api/note/createnote" .  log in required
router.post(
  "/createnote",
  fetchuser,
  [
    // validating data or setting restrictions for user inputs
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 8 }),
  ],
  async (req, res) => {
    try {
      //getting values from req.body
      const { title, description, tag } = req.body;
      // checking errors while taking userinputs
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //creating a new note of given values from req.body

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      //saving note to the database
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.msg);
      res.status(500).send("Internal error occured");
    }
  }
);


//Endpoint - 3
// Update an existing note using: PUt "api/note/updatenote/:d" -  log in required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    //create a new note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find the specific note to be updated with id comes in api
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Fot Found");
    }

    //check if user id of note and user id of logged in person is same or not
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }

    //if everything is fine then update the note
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.msg);
    res.status(500).send("Internal error occured");
  }
});


//Endpoint - 4
// Delete an existing note using: Delete "api/note/deletenote/:d" -  log in required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find the specific note to be deleted with id comes in api
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Fot Found");
    }

    //check if user id of note and user id of logged in person is same or not
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }

    //if everything is fine then delete the note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "note deleted", note: note });
  } catch (error) {
    console.error(error.msg);
    res.status(500).send(error);
  }
});


module.exports = router;
