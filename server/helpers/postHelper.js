const Post = require('../model/Post');

const existRoom = async ({ room }) => {
    try {
        const check = await Post.findOne({ film: room });
        if (!check) {
            return { error: 'Không tồn tại Room' }
        } else {
            return { check }
        }
    } catch (error) {
        throw error
    }
};

const createRoom = async ({ room }) => {
    try {
        const newRoom = new Post({
            film: room,
        })
        if (!newRoom) {
            return { error: 'Tao phong that bai' }
        }
        await newRoom.save();
        return newRoom;

    } catch (error) {
        throw error

    }

};

const addMessage = async ({ values }) => {
    const { username, content, filmId } = values;
    if (content === "" || username === "") {
        return false
    }
    const newMessage = {
        $push: {
            "messages": {
                username,
                content,
                createdAt: Date.now(),
            }
        }
    }
    const room = await Post.findOneAndUpdate({ film: filmId }, newMessage)
    if (!room) {
        return false;
    } else {
        return true;
    }
};



module.exports = { createRoom, addMessage, existRoom };