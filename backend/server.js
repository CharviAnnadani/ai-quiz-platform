const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const User = require("./models/User");
const Quiz = require("./models/Quiz");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Quiz Backend Running Successfully");
});


// ================= REGISTER =================

app.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User Registered Successfully",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});


// ================= LOGIN =================

app.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found",
      });

    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });

    }

    res.status(200).json({
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});


// ================= ADD QUIZ =================

app.post("/addquiz", async (req, res) => {

  try {

    const {
      category,
      question,
      options,
      correctAnswer,
    } = req.body;

    const newQuiz = new Quiz({
      category,
      question,
      options,
      correctAnswer,
    });

    await newQuiz.save();

    res.status(201).json({
      message: "Quiz Added Successfully",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});


// ================= GET ALL QUIZZES =================

app.get("/quiz", async (req, res) => {

  try {

    const quizzes = await Quiz.find();

    res.status(200).json(quizzes);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});


// ================= GET QUIZ BY CATEGORY =================

app.get("/quiz/:category", async (req, res) => {

  try {

    const category = req.params.category;

    const quizzes = await Quiz.find({
      category,
    });

    res.status(200).json(quizzes);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});


const PORT = 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});