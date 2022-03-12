const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();
const argon2 = require('argon2')
const User = require('../model/User');
const mongoose = require('mongoose');

//@route GET api/users
//@desc Get ALl Users
//@access Pravite
router.get('/', verifyToken, async (req, res) => {
    const { limit, search: key, pages } = req.query;
    console.log('getUsers', req.query)
    try {
        let conditions;
        let users;
        let count;
        let regex = new RegExp(key, 'i')
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(400)
                .json({ success: false, message: 'User not found' })
        };
        switch (true) {
            case (key !== "" && key !== undefined):
                console.log('vao 0')
                conditions = {
                     username: {$regex: key, $options: 'i'}
                };
                break;
            case (key === ""):
                console.log('vao 1')
                conditions = null
                break;
            default: return conditions = null;
        }
       
        if (conditions !== null) {
            users = await User.find(conditions).skip((parseInt(pages) - 1) * limit).limit(limit);
            count = await User.find(conditions).countDocuments();
            console.log(count)
            console.log('conditions', conditions)
            console.log('users-59:', users);
        } else {
            users = await User.find().skip((parseInt(pages) - 1) * limit).limit(limit)
            count = await User.find().countDocuments();
            console.log('no Conditions', count)
        }

        const { role } = user;

        if (role > 0) {

            return res.json({ success: true, message: "Get all user success!", users, totalPages: Math.ceil(count / limit) })
        } else {
            return res.status(400).json({ success: false, message: "Bạn không có quyền truy cập" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
});


//@route GET /users/:id
//desc Get one user
//@access Private
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ success: false, message: 'User not Found' })
        }

        res.json({ success: true, message: 'User exist', user })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@route DELETE /users/:id
//@desc delele user by id
//@access Pravite
router.delete('/:id', verifyToken, async function (req, res) {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(400)
                .json({ success: false, message: 'User not found' })
        }
        if (user.role > 0) {
            const userIdDelete = await User.findByIdAndDelete(req.params.id)
            if (!userIdDelete) {
                return res.status(400)
                    .json({ success: false, message: 'User have to delete not found' })
            } else {
                res.json({ success: true, message: "Delete user success" })
            }

        } else {
            res.status(400).json({ success: false, message: "You do not have permission to delete" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

});
router.put('/:id', verifyToken, async (req, res) => {
    const { username, password, createdAt, role, _v } = req.body;
    console.log(req.params.id);
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400)
                .json({ success: false, message: 'User admin not found' })
        }
        if (user.role > 0 || user.role === 0) {
            const userUpdate = await User.findByIdAndUpdate(req.params.id, {
                username,
                password,
                _id: req.params.id,
                role,
                createdAt,
                _v
            }, { new: true })
            if (!userUpdate) {
                return res.status(400)
                    .json({ success: false, message: 'User needs to be updated not found' })
            }
            res.json({ success: true, message: "Update User success", userUpdate })
        }




    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})



module.exports = router;