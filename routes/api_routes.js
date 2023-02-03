const router = require("express").Router();
const uuid = require("../helpers/uuid");
const utils = require("../helpers/fsUtils");
const notes = require("../db/db.json");

router.get("/notes", (req, res) => {
    utils.readFromFile("./db/db.json").then(data => res.json(JSON.parse(data)))
});

router.post("/notes", (req, res) => {
    let newNote= {
        title: req.body.title,
        text: req.body.text,
        id: uuid()
    };
    utils.readAndAppend(newNote, "./db/db.json");

    res.json("Success")
});


router.delete('/notes/:id', (req, res) => {
    
    if (req.params.id){
        const notesId = req.params.id;
        for (let i = 0; i < notes.length; i++) {
            const currentNote = notes[i];
            if (currentNote.id === notesId) {
              currentNote.notes -= 1;
              res.json(`Success`);
              return;
            }
          }
          res.status(404).json('Note ID not found');
        } else {
            res.status(400).send('Review ID not provided');
          }
      });



// notes = (notes => notes.id !== id)
//     }else {
//         res.status(404).json({message:"cant find"})
//     }
//     res.json("Delete request successful");
// });
module.exports = router;