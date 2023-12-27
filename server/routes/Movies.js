const express = require("express");
const router = express.Router();
const { Movie, MovieCategory, Category } = require("../models");


// Get all movies
router.get("/", async (req, res) => {
    const movies = await Movie.findAll();
    res.json(movies);
});


// Get movies by category
router.get("/category/:categoryName", async (req, res) => {

    const categoryName = req.params.categoryName;

    try {
        // Finds the category and associated movies
        const category = await Category.findOne({
            where: {
                name: categoryName
            },
            include: [
                {
                    model: Movie,
                    through: {
                        attributes: []
                    },
                    attributes: ["id", "title", "poster", "trailer"]
                }
            ]
        })

        if (category && category.Movies) {
            return res.json(category.Movies);
        }

        return res.status(404).send({ message: "Category not found or empty"});
        
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Failed to fetch movie category " + categoryName})
    }
});


// Create new movie
router.post("/", async (req, res) => {
    const movie = req.body;
    await Movie.create(movie);
    res.json(movie);
});



module.exports = router;