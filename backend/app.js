
const express = require('express');
const app = express();
const cors = require('cors');
const notesRouter = require('./routes/notes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.send('hey')
})

app.use('/api/notes', notesRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(()=>{

    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('MongoDB connection error:', err));