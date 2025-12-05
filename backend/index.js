const express = require("express");
const appError = require("./middlewares/error");
const path = require("path");
const db = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { app, server } = require("./utils/socket");

//#region App Initialization
require("dotenv").config();
const PORT = process.env.Port || 5000;
//#endregion

//#region Middlewares
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

//#region Error Handling
app.use(appError.notFoundRoute);
app.use(appError.errorHandler);
//#endregion

server.listen(PORT, () => {
  db();
  console.log(`Server is running on port ${PORT} ⛹️`);
});
