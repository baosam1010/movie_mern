require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const filmRouter = require('./routes/film');

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@movie.u8gci.mongodb.net/movie?retryWrites=true&w=majority`)
        console.log('mongoDB connect');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
connectDB();


app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/film', filmRouter);


const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('hello')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
