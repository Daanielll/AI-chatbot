const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

// JSON
app.use(express.json());

// CORS
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// COOKIES
app.use(cookieParser());

// ROUTES

// Error handler
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
