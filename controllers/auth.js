const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

// Registering a user
exports.register = (req, res) => {
    console.log(req.body);

    const { username, email, password, passwordConfirm } = req.body;
    
    // Connecting to the database
    db.query('SELECT email FROM user_info WHERE email = ?', [email], async (error, results) => {
        if(error) {
            console.log(error);
        }

        // Checking if email is already in use
        if(results.length > 0) {
            return res.render("register", {
                message: "That email is already in use"
            })
        } else if(password !== passwordConfirm) {
            return res.render("register", {
                message: "Passwords do not match"
            });
        }

        // Encrypting the password
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO user_info SET ?', {user_name: username, email: email, password: hashedPassword}, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render("register", {
                    message: "User registered"
                });
            }
        })

    })
}