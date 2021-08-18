// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }
const config = require("config");

const express = require("express");
const flash = require("express-flash");
const app = express();
const mongoose = require("mongoose");
const db = config.get("MONGO_URI");
const routes = require("./routes");
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type, x-auth-token");
  next();
});

// database stuff
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());

app.get("/", (req, res) => {
  res.send(`<h1>Chillify server is running...</h1>`);
});

app.use("/artists", routes.artistsRouter);
app.use("/playlists", routes.playlistsRouter);
app.use("/songs", routes.songsRouter);
app.use("/users", routes.usersRouter);
app.use("/auth", routes.authRouter);

app.listen(port, function () {
  console.log("Server is running on Port: " + port);
});
