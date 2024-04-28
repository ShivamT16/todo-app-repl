const express = require("express");
const cors = require("cors");
const app = express();

require("./db");
const Todo = require("./models/todo.model");
const TodoUser = require("./models/user.model");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Todos Application");
});

app.post("/todo", async (req, res) => {
  try {
    const newTodo = await Todo(req.body);
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ "Error adding new Todo": error });
  }
});

app.get("/todo", async (req, res) => {
  try {
    const todo = await Todo.find();
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json("No Todo found");
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.post("/todo/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedTodo) {
      res.status(201).json(updatedTodo);
    } else {
      res.status(404).josn("Error updating todo");
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.delete("/todo/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedTodo);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.get("/todo/user", async (req, res) => {
  try {
    const users = await TodoUser.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.post("/signin", async (req, res) => {
  try {
    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.password ||
      !req.body.confirmPassword
    ) {
      res.status(404).json("Please fill all the details");
    } else {
      const findUser = await TodoUser.findOne({ email: req.body.email });
      if (findUser) {
        res.status(400).json("Email elready exist");
      } else {
        if (req.body.password === req.body.confirmPassword) {
          const newUser = await TodoUser(req.body);
          const savedUser = await newUser.save();
          res.status(201).json(savedUser);
        } else {
          res.status(400).json("Passwords don't match");
        }
      }
    }
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

app.post("/login", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).json("Please fill all the details");
    } else {
      const findUser = await TodoUser.findOne({ email: req.body.email });
      if (findUser && findUser.password === req.body.password) {
        res.status(200).json(findUser);
      } else {
        res.status(400).json("Credentials Invalid");
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const deletedTodo = await TodoUser.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedTodo);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
