const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// hande error

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");

  process.exit(1);
});
// connec to db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DATEBASE CONNECTED!"))
  .catch((err) => console.log(err));

// create server
const Server = http.createServer(app);
const PORT = process.env.PORT || 8000;

// listen server
Server.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});

// handle error
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  // console.log(err.name, err.message);

  Server.close(() => {
    process.exit(1);
  });
});
