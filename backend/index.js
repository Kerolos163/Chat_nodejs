const express = require("express");
const appError = require("./middlewares/error");
const db = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

//#region App Initialization
const app = express();
const PORT = process.env.Port || 5000;
//#endregion

//#region Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//#endregion

//#region Routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/message", require("./routes/message.route"));
//#endregion

//#region Error Handling
app.use(appError.notFoundRoute);
app.use(appError.errorHandler);
//#endregion

app.listen(PORT, () => {
  db();
  console.log(`Server is running on port ${PORT} ⛹️`);
});
