const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware')

const User = require('../model/User')

//@router GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            return res.status(400)
                .json({ success: false, message: 'User not found' })
        }
        res.json({ success: true, message: "Found one user", user });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//@route POST api/auth/register
//des Register user
//@access Public
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // simple validation
    if (!username || !password) {
        return res.status(400)
            .json({
                sucess: false,
                message: 'Missing username or password'
            })
    }
    try {
        // check user exists in the database
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).
                json({
                    sucess: false, message: 'Username has been used'
                })
        }

        // Check condition all good and save in database
        const hashePassword = await argon2.hash(password);
        const newUser = new User({
            username,
            password: hashePassword,
        });
        await newUser.save();

        // return token
        const accessToken = await jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            success: true,
            message: 'User created successfully',
            accessToken
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
});


//@route Post api/auth/login
//des Login user
//@access Public
router.post('/login', async (req, res) => {
    const { username, password, } = req.body;

    //simple validation login
    if (!username || !password) {
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or password' })
    };
    try {
        //check user in database
        const user = await User.findOne({ username });

        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect username or password' })

        };
        // username found in database, check password
        const passwordValid = await argon2.verify(user.password, password);

        if (!passwordValid) {
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect username or password' })
        };

        // Condition all good,  return token
        const accessToken = await jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        )

        res.json({
            success: true,
            message: 'User login successfully',
            accessToken
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })

    }

})

module.exports = router;