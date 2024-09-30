import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

const app = express();
const PORT = 3000;

// connect to db
connectDB();

// SCHEMA / blueprint
const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 8 },
  },
  {
    timestamps: true,
  }
);

// model / collection

const Item = new mongoose.model("item", itemSchema);

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app
  .route("/")
  .get(async (req, res) => {
    let foundItems;

    try {
      foundItems = await Item.find({});

      res.render("list", {
        date: new Date().toLocaleDateString(),
        tasks: foundItems.length > 0 && foundItems,
      });
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  })
  .post(async (req, res) => {
    // creating a new document
    let item;

    try {
      item = new Item({
        name: req.body.new_item,
      });

      await item.save();
      console.log(item);
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.redirect("/");
    }
  });

app.route("/delete/:id").get(async (req, res) => {
  const id = req.params.id;

  console.log(id);

  try {
    await Item.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// setup server
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
