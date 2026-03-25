const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/icecream");

// Schemas
const Item = mongoose.model("Item", {
    name: String,
    type: String
});

const User = mongoose.model("User", {
    username: String,
    password: String
});

const Order = mongoose.model("Order", {
    item: String
});

// LOGIN
app.post("/login", async (req, res) => {
    let user = await User.findOne(req.body);
    if(user) res.send("success");
    else res.send("fail");
});

// ADD ITEM (Admin)
app.post("/add-item", async (req, res) => {
    let item = new Item(req.body);
    await item.save();
    res.send("added");
});

// GET ITEMS
app.get("/items", async (req, res) => {
    let items = await Item.find();
    res.json(items);
});

// ORDER
app.post("/order", async (req, res) => {
    let order = new Order(req.body);
    await order.save();
    res.send("ordered");
});

app.listen(3000, () => console.log("Server running"));