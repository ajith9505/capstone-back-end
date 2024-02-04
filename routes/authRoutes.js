const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/users');

// POST /auth/register
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        user = new User({
            name,
            email,
            password,
        });

        await user.save();
        res.status(201).json({ msg: "User registered successfully" });

        // const payload = {
        //   user: {
        //     id: user._id,
        //   },
        // };

        // jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }),
        //   (err, token) => {
        //     if (err) throw err;
        //     res.json({ token });
        //   };
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// POST /auth/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const payload = {
            user: {
                id: user._id,
                name: user.name
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
            (err, token) => {
                if (err) throw err;
                res.json({ "token": token });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// GET /auth/logout
router.get("/logout", (req, res) => {
    res.json({ msg: "User logged out successfully" });
});


module.exports = router;