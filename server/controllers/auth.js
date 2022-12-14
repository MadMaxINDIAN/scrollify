const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.signup = async (req, res, next) => {
    const { email, firstName, lastName, password, contact, line1, city, state, pincode, type } =
        req.body;
    // Error validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({ message: "Validation error", errors: errors.array() });
    }
    try {
        // Checking if user already exists
        const user = await User.findOne({ email: email });
        if (user) {
            return res
                .status(400)
                .json({ message: "User already exists. Please login!" });
        }
        // Encrypting password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Creating user
        const name = firstName + " " + lastName;
        const newUser = await User.create({
            email,
            password: hashedPassword,
            name,
            contact,
            address: {
                line1,
                city,
                state,
                pincode,
            },
            type,
        });
        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (err) {
        res.status(500).json({ message: err.message || "Something went wrong" });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    // Error validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(422)
            .json({ message: "Validation error", errors: errors.array() });
    }
    try {
        // Finding user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }
        // Matching password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        // Generating JWT token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET_KEY
        );
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                email,
                name: user.name,
                contact: user.contact,
                address: user.address,
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message || "Something went wrong" });
    }
};
