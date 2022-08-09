const express = require("express");
const reportRoutes = require("./routes/reportGeneration");
const cors = require("cors");
const app = express();
app.set("view engine", "ejs");
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/report", reportRoutes);

// set static file on production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
