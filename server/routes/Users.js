const express = require("express");
const router = express.Router();
const { Users } = require("../models")

const sampleUsers = [
    {
        "id": 1,
        "name": "Enes"
    },
    {
        "id": 2,
        "name": "Gide"
    }
]

router.get("/", async (req, res) => {
    const allUsers = await Users.findAll();
    res.json(allUsers);
})

router.post("/", async (req, res) => {
    const user = req.body;
    await Users.create(user);
    res.json(user);
})

// Place dynamic routes at the bottom
// Eg: "/new" would take the id "new" here
router
    .route("/:id")
    .get((req, res) => {
        res.send(sampleUsers[req.params.id-1].name);
        //res.send("Get user id " + username);
    })
    .put((req, res) => {
        res.send("Update user id " + req.params.id);
    })
    .delete((req, res) => {
        res.send("Delete user id " + req.params.id);
    })


module.exports = router;