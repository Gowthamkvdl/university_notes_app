import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors"; // Import CORS package
import postRoute from "./routes/post.route.js";

const PORT = 8080;

const app = express();

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your front-end
    credentials: true,
  })
);
// Configure CORS
// app.use(
//   cors({
//     origin: "https://staffproject.onrender.com", // Allow requests from your front-end
//     credentials: true,
//   })
// );

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the media directory
const mediaPath = path.join(__dirname, "../pdfs"); // Adjust the path to point to the pdfs directory

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/pdfs", express.static(mediaPath));

// Routes
app.use("/api/post", postRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
