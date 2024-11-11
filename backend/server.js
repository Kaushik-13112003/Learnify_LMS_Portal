const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { v2 } = require("cloudinary");

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//connect to cloud
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//connecting to Database
require("./database/db");

//routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/course", require("./routes/courseRoutes"));

app.listen(PORT, () => {
  console.log(colors.green("Server is Running on PORT :", PORT));
});
