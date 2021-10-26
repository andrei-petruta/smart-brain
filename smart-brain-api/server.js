require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: "smart-brain",
  },
});

db.select()
  .from("users")
  .then((data) => {
    console.log(data);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("Error logging in.");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  // bcrypt.hash(password, null, null, function (err, hash) {
  //   console.log(hash);
  // });
  db("users")
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .then(console.log);

  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("No such user.");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("No such user.");
  }
});

app.listen(3001, () => {
  console.log("App is running on port 3001");
});

/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = new user
/profile/:userId --> GET = user
/image --> PUT = updated user

*/
