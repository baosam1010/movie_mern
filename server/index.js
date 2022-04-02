require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");


const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const filmsRouter = require('./routes/films');
const usersRouter = require('./routes/users');
const { createRoom, addMessage, existRoom } = require('./helpers/postHelper');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "https://sammovie.netlify.app/"
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

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

io.on("connection", (socket) => {
    console.log('user connect')
    socket.on('join', async ({ room, user }, callback) => {
        if (user) {
            const { error, check } = await existRoom({ room });
            const roomId = JSON.stringify(room);

            if (!check) {
                console.log('checkRoom-46:', error)
                const newRoom = createRoom({ room, user })
                if (!newRoom) {
                    callback('Tao phong that bai')
                } else {
                    socket.join(roomId);
                    // socket.emit('message', { username: 'admin', content: `${user.username}, welcome to Newroom ${roomId}.` });
                    io.to(roomId).emit('message', { username: 'admin', content: `${user.username} has joined!` });
                }
            } else {
                socket.join(roomId);
                // socket.emit('message', { username: 'admin', content: `${user.username}, welcome to Checkroom ${roomId}.` });
                io.to(roomId).emit('message', { username: 'admin', content: `${user.username} has joined!` });
                io.to(roomId).emit('messages', check.messages);

            }
        }
        callback();
    }
    )

    socket.on('sendMessage', async (values) => {
        try {
            const roomId = JSON.stringify(values.filmId)
            const result = await addMessage({ values });
            if (result) {
                // socket.emit('message', values);
                io.to(roomId).emit('message', values)
            } else {
                console.log('add message fail')
            }

        } catch (error) {

        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnect')

    })

});

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/films', filmsRouter);
app.use('/api/users', usersRouter);


const port = process.env.PORT || 5000

// app.listen(port, () => {
//     console.log(`App listening on port ${port}`)
// });
httpServer.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

