const express = require('express');
const verifyToken = require('../middleware/authMiddleware')
const router = express.Router();

const Film = require('../model/Film');
const User = require('../model/User');



//@oute GET api/film
//@desc  Get all film
//@access public
router.get('/', async (req, res) => {
    const { pages, search, limit } = req.query;

    try {
        let films
        if (!search) {
            films = await Film.find().sort({ createdAt: -1 }).limit(limit);
        } else {
            films = await Film.find({ category: search }).sort({ createdAt: -1 }).limit(limit);
        } 
        if(!search && !limit){
            films = await Film.find();            
        }

        if (!films) {
            return res.status(400)
                .json({ message: "Films not found", success: false })
        }

        res.json({
            success: true,
            message: "Films found",
            listFilm: films
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Internal server error "
        })
    }
})


//@oute GET api/film/:id
//@desc  Get film by id
//@access public
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const film = await Film.findById(id);
        if (!film) {
            return res.status(400)
                .json({ message: "Films not found", success: false })
        }
        res.json({
            success: true,
            message: "Films found",
            film
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Internal server error "
        })
    }
})

//@route POST api/film
//@desc Add movie 
//@access Pravite

router.post('/', verifyToken, async (req, res) => {
    const { category, filmName, actorName, description, poster,
        country, url, year } = req.body;
    console.log(req.body);
    // simple validate
    if (!filmName || !poster || !url) {
        return res.status(404)
            .json({ message: "Add film failed", sucess: false });
    }
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(401)
                .json({ message: "User Admin do not found", sucess: false });
        } else if (user.role > 0) {
            const newfilm = new Film({
                category, filmName, actorName, description, poster,
                country, url, year

            })
            await newfilm.save();
            res.json({ success: true, message: 'Add film success!', film: newfilm })

        } else {
            return res.status(404)
                .json({ message: "You have to  permission of admin", sucess: false });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
});


//@route PUT api/film
//desc Edit film by id
//access Pravite
router.put('/:id', verifyToken, async function (req, res) {
    const { id } = req.params;
    const { category, filmName, actorName, description, poster,
        country, url, year } = req.body;
    if (filmName === "" || url === "") {
        return res.status(400).json({
            message: "You need to fill all the field",
            success: false,
        })
    };
    try {
        const user = await User.findById(req.userId);
        if (!user || !user.role > 0) {
            return res.status(400).json({
                message: "You do not have permission of Admin",
                success: false,
            })
        };
        const newFilm = await Film.findByIdAndUpdate(id, {
            category, filmName, actorName, description, poster,
            country, url, year
        }, { new: true });
        if (!newFilm) {
            return res.status(400).json({
                message: "Film not found",
                success: false,
            })
        };

        res.json({ success: true, message: "Update film success", film: newFilm });


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


//@route DELETE api/film/:id
//@desc Delete a film
//@access Pravite

router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params
    try {
        const film = await Film.findByIdAndDelete(id);
        const user = await User.findById(req.userId);
        if (!user || !user.role > 0) {
            return res.status(400)
                .json({
                    message: "You do not have permission of Admin",
                    success: false
                })
        }
        if (!film) {
            return res.status(400).json({ message: "Film not found", success: false })
        }
        res.json({ message: "Delete Flm success", success: true })



    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


module.exports = router;