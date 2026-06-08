const express = require("express");
const router = express.Router();

const userService = require("../services/UserServices");
router.post("/login", async (req, res) => {
    console.log("LOGIN REQUEST");

    const { userName, passwordHash } = req.body;

    const users = await userService.login(userName, passwordHash);

    if (users.length === 0) {
        return res.json({
            success: false,
            message: "Invalid username or password"
        });
    }
    res.json({
        success: true,
        user: users[0]
    });
});

router.get("/", async (req, res) => {

    const users = await userService.getAllUsers();

    res.json(users);
});

module.exports = router;