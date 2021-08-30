const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const TodoModel = require("./models/Schema");
const Todo = require("./models/Schema");

mongoose
  .connect(
    "mongodb+srv://newuser:batmanis@cluster0.ypxz1.mongodb.net/tododb?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("DB Connected"))
  .catch(console.error);

app.get("/todos", async (req, res) => {
  const todos = await TodoModel.find();

  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  const todo = new TodoModel({
    text: req.body.text,
  });

  todo.save();

  res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
});

app.listen(8000, () => {
  console.log("server started");
});
