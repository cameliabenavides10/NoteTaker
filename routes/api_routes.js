const router = require("express").Router();
const uuid = require("../helpers/uuid");
const utils = require("../helpers/fsUtils");
// const { fstat } = require("fs");
const fs = require("fs");
// const notes = require("../db/db.json");

router.get("/notes", (req, res) => {
    utils.readFromFile("./db/db.json").then(data => res.json(JSON.parse(data)))
});

router.post("/notes", (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid()
    };
    utils.readAndAppend(newNote, "./db/db.json");

    res.json("Success")
});


router.delete('/notes/:id', (req, res) => {
    console.log(req.params.id);
    utils.readFromFile("./db/db.json", "utf8")
        .then(notes => {

            // res.json(JSON.parse(notes) )
            console.log(JSON.parse(notes));
            console.log(`This is object legnth ${JSON.parse(notes).length}`);
            console.log(`This is param.id : ${req.params.id}`);
            const newNotesInfo = JSON.parse(notes);


            for (let i = 0; i < newNotesInfo.length; i++) {

                if (newNotesInfo[i].id === req.params.id) {
                    console.log(`Hello ${newNotesInfo[i].id}`)
    
                    let newNewNote = newNotesInfo.splice(newNotesInfo[i].id, 1)
    console.log(newNewNote);

                    console.log(newNotesInfo);


                    fs.writeFile('./db/db.json', JSON.stringify(newNotesInfo, null, 4),
                        (err) => err ? console.log(err) : console.log("Your note has been deleted."));


                } else {

                    console.log("After line 33")

                }
            }
        })


    res.json("success");
});


module.exports = router;