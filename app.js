const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

dotenv.config({ path: "./.env" });

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.set("view engine", "hbs");

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log("Connected to database...");
})

//Define Routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.get("/index",function(req, res) {
    res.sendFile(__dirname + "/index.hbs");
});

// Log in
app.post("/auth/login",encoder,function (req, res){
    var email = req.body.email;
    var password = req.body.password;
    db.query("SELECT * FROM user_info WHERE email = ? AND password = ?", [email, password], function(err, result, fields){
        if(result.length > 0){
            res.redirect("/index");
        } else {
            res.render("login", {message: "Incorrect email or password"});
        }
    });
});

// when login is successful
app.get("/index",function(req, res) {
    res.sendFile(__dirname + "/index.hbs");
});

// Port
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});