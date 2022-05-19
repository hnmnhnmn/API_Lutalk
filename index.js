require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const routerAuth = require("./routers/auth");


const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://admin:N188m23n279@cluster0.nrj7q.mongodb.net/server-simple?retryWrites=true&w=majority', {
      
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Mongoose connected");
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
};

connectDB();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// router
app.use("/api/auth", routerAuth);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log("Server is running on port 5000"));