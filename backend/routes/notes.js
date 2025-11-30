
const express = require('express');
const notesModel = require('../models/notesModel');
const router = express.Router();

router.get('/',async(req,res)=>{

    const note = await notesModel.find().sort({ createdAt: -1 });

    res.json(note);
})

router.post('/',async(req,res)=>{

    const {title,content} = req.body;

    if(!title || !content){
        return res.status(400).json({ message: 'Title & Content required' });
    }

  const note = await  notesModel.create({
        title,
        content
    });

    res.json(note)
});

router.delete('/:id',async(req,res)=>{

   const note = await notesModel.findOneAndDelete(req.params.id);

   res.json(note)
})


module.exports = router;