const express= require("express");
const router = express.Router();
const { Movies } = require("../models");

router.get("/", async (req, res) => {
    const allMovies = await Movies.findAll();
    res.json(allMovies);
});

router.post("/", async (req, res) => {
    const movie = req.body;
    await Movies.create(movie);
    res.json(movie);
});

module.exports = router;