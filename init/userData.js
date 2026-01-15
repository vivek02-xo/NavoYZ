const mongoose = require("mongoose");
const User = require("../model/user");

const MONGO_URL = "mongodb://127.0.0.1:27017/novayz";

mongoose.connect(MONGO_URL)
  .then(() => console.log("Mongo connected"))
  .catch(err => console.log(err));

const fakeUsers = [
  {
    name: "Aarav Sharma",
    username: "aarav01",
    email: "aarav@gmail.com",
    password: "password123",
    phone: "9876543210",
    bio: "Founder building cool digital products."
  },
  {
    name: "Riya Mehta",
    username: "riya_mehta",
    email: "riya@gmail.com",
    password: "password123",
    phone: "9123456780",
    bio: "Designer & marketer."
  },
  {
    name: "Kabir Singh",
    username: "kabir_s",
    email: "kabir@gmail.com",
    password: "password123",
    phone: "",
    bio: ""
  },
  {
    name: "Ananya Verma",
    username: "ananya_v",
    email: "ananya@gmail.com",
    password: "password123",
    phone: "9000011111",
    bio: "Product manager."
  },
  {
    name: "Rohit Patel",
    username: "rohitp",
    email: "rohit@gmail.com",
    password: "password123",
    phone: "",
    bio: ""
  }
];

async function seedUsers() {
  await User.deleteMany({ role: "user" }); // optional: clears old fake users

  for (let userData of fakeUsers) {
    const { password, ...userInfo } = userData;

    const user = new User(userInfo);
    await User.register(user, password);
  }

  console.log("Fake users added");
  process.exit();
}

seedUsers();
