const express = require('express');
const router = express.Router();

const Post = require('../model/Post');
const verifyToken = require('../middleware/authMiddleware');


//@route POST api/posts
//des Create post
//@access Pravite
router.post('/', verifyToken, async (req, res) => {
    const { description } = req.body;

    // check description required
    if (!description) {
        return res.status(400)
            .json({ success: false, message: "Don't have post" })
    }
    try {
        const newPpost = new Post({ description, userId: req.userId })
        await newPpost.save();

        res.json({ success: true, message: 'create post sucess', post: newPpost })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

});

//@route GET api/posts
//des GET post
//@access Pravite
router.get('/', verifyToken, async (req, res)=>{

    try {
        const  posts = await Post.find({userId: req.userId}).populate('user', ['username'])
        res.status(400).json({
            sucess: true,
            posts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    
    }
});

//@route PUT api/posts
//des PUT post
//@access Pravite
router.put('/:id', verifyToken, async (req, res)=>{
    const {description} = req.body;

    if(!description){
        return res.status(400)
            .json({ success: false, message: "Don't have post" })
    
    }
    try {
        let updatedPost ={
            description,
            userId: req.userId
        };

        const postUpdateCondition = { _id: req.params.id, user: req.userId }
        updatedPost = await Post.findOneAndUpdate(
			postUpdateCondition,
			updatedPost,
			{ new: true }
		);

        // user not authorized to update
        if(!updatedPost){
            return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})
        }
        res.json({
			success: true,
			message: 'Excellent progress!',
			post: updatedPost
		})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    
    }
});

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const postDeleteCondition = { _id: req.params.id, user: req.userId }
		const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

		// User not authorised or post not found
		if (!deletedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({ success: true, post: deletedPost })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router;