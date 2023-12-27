const express = require("express");
const app = express();
const cors = require("cors");
const initDatabase = require("./scripts/initDatabase");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const usersRouter = require("./routes/Users");
const moviesRouter = require("./routes/Movies");

app.use("/users", usersRouter);
app.use("/movies", moviesRouter);

//
db.sequelize.sync().then(() => {
    initDatabase().then(() => {
        console.log("Database init SUCCESS");
    }).catch(err => {
        console.log("Database init FAILED");
        console.log(err);
    })

    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});

