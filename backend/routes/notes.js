const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Router 1: Get all the notes: GET "/api/auth/fetchnotes". Login required
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

// Router 2: Add a new Notes using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("description", "Enter description at least 5 digit").isLength({
    min: 5,
  }),
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
    //   if there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await notes.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);


// Router 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
      try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

         //Allow updattion only if user owns this note
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});

      } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
      }
    }
  );

// Router 4: Delete an existing Note using: DELETE "/api/notes/updatenote". Login required
router.delete(
    "/deletenote/:id",
    fetchuser,
    async (req, res) => {
      try {

        //Find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        //Allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"success": "Note has been deleted"});

      } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
      }
    }
  );

module.exports = router;
