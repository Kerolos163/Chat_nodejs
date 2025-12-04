const { config } = require("dotenv");
const connectDB = require("../config/db.js");
const User = require("../models/user.model");

config();

const seedUsers = [
  // Female Users
  {
    email: "emma.thompson@example.com",
    fName: "Emma",
    lName: "Thompson",
    password: "123456",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    fName: "Olivia",
    lName: "Miller",
    password: "123456",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "sophia.davis@example.com",
    fName: "Sophia",
    lName: "Davis",
    password: "123456",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "ava.wilson@example.com",
    fName: "Ava",
    lName: "Wilson",
    password: "123456",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "isabella.brown@example.com",
    fName: "Isabella",
    lName: "Brown",
    password: "123456",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "mia.johnson@example.com",
    fName: "Mia",
    lName: "Johnson",
    password: "123456",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "charlotte.williams@example.com",
    fName: "Charlotte",
    lName: "Williams",
    password: "123456",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "amelia.garcia@example.com",
    fName: "Amelia",
    lName: "Garcia",
    password: "123456",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    fName: "James",
    lName: "Anderson",
    password: "123456",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "william.clark@example.com",
    fName: "William",
    lName: "Clark",
    password: "123456",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "benjamin.taylor@example.com",
    fName: "Benjamin",
    lName: "Taylor",
    password: "123456",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "lucas.moore@example.com",
    fName: "Lucas",
    lName: "Moore",
    password: "123456",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "henry.jackson@example.com",
    fName: "Henry",
    lName: "Jackson",
    password: "123456",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "alexander.martin@example.com",
    fName: "Alexander",
    lName: "Martin",
    password: "123456",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "daniel.rodriguez@example.com",
    fName: "Daniel",
    lName: "Rodriguez",
    password: "123456",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();