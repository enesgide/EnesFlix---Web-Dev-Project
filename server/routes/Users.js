const express = require("express");
const router = express.Router();
const { Users } = require("../models")


// Get all users
router.get("/", async (req, res) => {
    const allUsers = await Users.findAll();
    res.json(allUsers);
})


// Create new user
router.post("/", async (req, res) => {
    const { username, password } = req.body;

    // Validate user details
    if (!username || !password) return res.status(400).json({ message: "Username and password required" });

    // Check if duplicate username exists
    const existingUser = await Users.findOne({ where: { username } }); // If {name, pass} = req.body, do where: {username: name}
    if (existingUser) return res.status(400).json({ message: "Username is already taken" });

    // Hash password

    // Create new user
    try {
        const newUser = await Users.create({ username, password });
        res.status(201).json({message: "User successfully created"});
    } catch {
        res.status(500).json({message: "Error creating user"});
    }
})


// Login to user
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    // Validate login details
    if (!username || !password) return res.status(400).json({ message: "Username and password required" });

    try {
        // Verify username exists
        const user = await Users.findOne({ where: { username } });
        if (!user) return res.status(401).json({ message: "Invalid login details" });

        // Verify password matches
        if (password !== user.password) return res.status(401).json({ message: "Invalid login details" });

        // Success
        return res.json({ message: "Log in successful" });
    } catch {
        res.status(500).json({message: "Error logging in"});
    }
})


// Place dynamic routes at the bottom
// Eg: "/new" would take the id "new" here

router
    .route("/:id")
    // Get user with id
    .get((req, res) => {
        res.send("Get user id " + req.params.id);
    })


module.exports = router;