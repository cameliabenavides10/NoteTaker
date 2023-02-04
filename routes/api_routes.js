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
    let newNote= {
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
                const valueId = req.params.id;
                const indexId= newNotesInfo.id;
                console.log(`Hello ${newNotesInfo[i].id}`)

                let newNewNote = newNotesInfo.splice(newNotesInfo[i].id, 1)
console.log(newNewNote);
                // function removeNote(newNotesInfo){
                //    let whatever=  notes[i].id
                //    console.log(whatever);
                //         if ( req.params.id === whatever){
                //             newNotesInfo.splice(indexId, 1);
                //             return true;
                //         }
                //         return false;
                // }
                console.log(newNotesInfo);
                // console.log(removeNote());
                // const xId = newNotesInfo.filter(removeNote);
                //    console.log(xId);
                // newNotesInfo.splice()
                // const index = newNotesInfo.indexof(req.params.id);
                // newNotesInfo.splice(index, 1);

                fs.writeFile('./db/db.json', JSON.stringify(newNotesInfo),
                (err) => err? console.log(err): console.log("Your note has been deleted."));

            res.status(400).json({ msg: "Successfully read` ${req.params.id}`" });
          } else {
            // notes.filter(notes => notes.id !== req.params.id);
            console.log("After line 33")
            
          }
        } 
    })
    
    // const deleted = notes.some(notes.id === req.params.id);
   res.json({msg :"not success"});
});
    

// notes = (notes => notes.id !== id)
//     }else {
//         res.status(404).json({message:"cant find"})
//     }
//     res.json("Delete request successful");
// });
module.exports = router;