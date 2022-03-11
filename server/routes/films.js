const express = require('express');
const verifyToken = require('../middleware/authMiddleware')
const router = express.Router();

const Film = require('../model/Film');
const User = require('../model/User');



//@oute GET api/film
//@desc  Get all film
//@access public
router.get('/', async (req, res) => {
    const { pages, search: key, arrangement, limit, category } = req.query;
    console.log('query:', req.query);


    try {
        let skip;
        let count;
        let films;
        let conditions;
        let sorted = {};
        sorted[arrangement] = -1;

        switch (true) {
            case (key === "" && category === ""):
                console.log('vao ')

                return null;
            case (key !== "" && !category):
                console.log('vao 1')
                conditions = {
                    $text: {
                        $search: key,
                    }
                };
                break;
            case (key === "" && !category):
                console.log('vao 2')
                conditions = {};
                break;
            case (!key && !category):
                console.log('vao 3')

                conditions = null;
                break;
            case (!category && key !== ""):
                console.log('vao 4')
                conditions = {
                    $text: {
                        $search: key,
                    }
                };
                break;
            case (category === "" && key !== ""):
                console.log('vao 5')
                conditions = {
                    $text: { $search: key }
                };
                break;
            case (category !== "" && !key):
                conditions = {
                    category
                };
                break;
            case (category !== "" && key === ""):
                conditions = {
                    category
                };
                break;
            case (category !== "" && key !== ""):
                conditions = {
                    $text: { $search: key },
                    category,
                };
                break;
            default: conditions = {};
        };
        if (conditions !== null) {
            if (parseInt(pages) > 0 && limit) {
                skip = (parseInt(pages) - 1) * limit;
                films = await Film.find(conditions)
                    .sort(sorted)
                    .skip(skip)
                    .limit(limit)
                count = await Film.countDocuments(conditions);
                console.log('count:', count)

            } else {
                count = await Film.countDocuments(conditions);
                films = await Film.find(conditions).sort(sorted).limit(limit);
            }
        } else {
            console.log('khong co condition')
            count = await Film.countDocuments();
            films = await Film.find().sort(sorted).limit(limit);
        }

        if (!films) {
            return res.status(400)
                .json({ message: "Films not found", success: false })
        }

        res.json({
            success: true,
            message: "Films found",
            listFilm: films,
            totalPages: Math.ceil(count / limit),
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
        country, url, year, episode } = req.body;
    // console.log(req.body);

    // simple validate
    if (category === "phimbo") {
        if (!filmName || !poster) {
            return res.status(404)
                .json({ message: "Add film failed", sucess: false });
        }
    } else if (!filmName || !poster || !url) {
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
                country, url, year, episode

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
        country, url, year, episode } = req.body;
    console.log('body:', req.body)
    if (category === "phimbo") {
        if (filmName === "") {
            return res.status(400).json({
                message: "You need to fill all the field",
                success: false,
            })
        }
    } else if (filmName === "" || url === "") {
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
            category,
            filmName,
            actorName,
            description,
            poster,
            country,
            url,
            year,
            episode
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