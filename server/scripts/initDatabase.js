const fs = require("fs");
const path = require("path");
const { Movie, Category } = require('../models');

const initDatabase = async () => {

    // Read JSON file
    const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/movies.json'), 'utf8'));

    // Iterate through movies
    for (const movieData of jsonData.movies) {
        // Check if movie already exists
        let movie = await Movie.findOne({ where: {title: movieData.title} });

        // Create new movie
        if (!movie) {
            console.log("=> Created new movie " + movieData.title);
            movie = await Movie.create({
                title: movieData.title,
                poster: movieData.poster,
                trailer: movieData.trailer
            });
        } else if (!movie.trailer && movieData.trailer) {
            console.log("=> Updating movie trailer for " + movie.title);
            await movie.update({
                trailer: movieData.trailer
            });
        }

        // console.log(movieData)
;
        // Add or update categories
        for (const categoryName of movieData.categories) {
            // Check if category exists
            let category = await Category.findOne({ where: {name: categoryName}});

            // Create new category
            if (!category) {
                console.log("=> Created new category " + categoryName);
                category = await Category.create({
                    name: categoryName
                })
            }

            // Associate category
            await movie.addCategory(category);
        }
    }
}

module.exports = initDatabase;