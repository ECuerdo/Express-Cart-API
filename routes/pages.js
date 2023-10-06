const express = require("express");

const router = express.Router();

router.get("/index", (req, res) => {
    res.render("index");
});

router.get("/settings", (req, res) => {
    res.render("settings");
});
router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/resetpass", (req, res) => {
    res.render("resetpass");
});
router.get("/policy", (req, res) => {
    res.render("policy");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});
router.get("/register", (req, res) => {
    res.render("register");
});
router.get("/changepassword", (req, res) => {
    res.render("changepassword");
});
router.get("/login", (req, res) => {
    res.render("login");
});
module.exports = router;