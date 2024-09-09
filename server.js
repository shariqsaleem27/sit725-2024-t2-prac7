const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const catRoutes = require("./controller/catRoutes");
const http = require("http"); // Import http to create a server
const { Server } = require("socket.io"); // Import Socket.io

const app = express();

// Use CORS middleware
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve images from the images folder
app.use("/images", express.static("images"));

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://shariqsaleem06:UrV1I9fkbzVQsQ8m@cluster0.hmdoch7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Use routes
app.use("/api", catRoutes);

// Create an HTTP server and wrap it with socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500", // Allow requests from your live server
    methods: ["GET", "POST"],
  },
});

// Handle socket connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socket.emit("message", "You are connected to the socket server!");

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});