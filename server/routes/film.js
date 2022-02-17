const express = require('express');
const verifyToken = require('../middleware/authMiddleware')
const router = express.Router();

const Film = require('../model/Film');


router.post('/', verifyToken, async (req, res, next) => {
    const { categories, filmName, actorName, description, poster,
        episode, country, createdAt } = req.body;
    const { url } = episode;

    // simple validate
    if (!filmName) {
        return res.status(404)
            .json({ message: "Add film failed", sucess: false });
    };
    if (!poster ) {
        return res.status(404)
            .json({ message: "Add film failed", sucess: false });
    };
    if (!url ) {
        return res.status(404)
            .json({ message: "Add film failed", sucess: false });
    };
});


module.exports = router;