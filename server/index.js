const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const auth = require("./controllers/authorization");

const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI,
});

// const db = knex({
//   client: "pg",
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   },
// });

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));

//   app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
//   });
// }

const baseURL = process.env.NODE_ENV === "development" ? "/api/" : "/";

app.get(`${baseURL}`, (req, res) => {
  console.log("It's working");
  res.send("it is working");
});

app.post(`${baseURL}signin`, signin.signinAuthentication(db, bcrypt));

app.post(`${baseURL}register`, (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get(`${baseURL}profile/:id`, auth.requireAuth, (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.post(`${baseURL}profile/:id`, auth.requireAuth, (req, res) => {
  profile.handleProfileUpdate(req, res, db);
});

app.put(`${baseURL}image`, auth.requireAuth, (req, res) => {
  image.handleImage(req, res, db);
});

app.post(`${baseURL}imageurl`, (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server running on ${process.env.NODE_ENV} - port ${port}`);
});
