const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.Port || 5000;

//#region Middlewares
//#endregion

//#region Routes
app.use("/api/auth", require("./routes/auth.route"));
//#endregion

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
