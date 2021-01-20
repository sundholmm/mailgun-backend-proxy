const express = require("express");
const cors = require("cors");
const controller = require("./api/controller");
const { handleError } = require("./api/models/error");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Get the env values
require("dotenv").config();

// Setup router
const router = express.Router();

// Setup the express application
const app = express();

// For AWS trust the first hop from the front-facing proxy server
app.set("trust proxy", 1);

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
});

// Apply rate limiting to all requests
app.use(limiter);

// Use helmet middleware for setting up multiple security headers
app.use(helmet());

// Use cors middleware for setting up Access-Control-Allow-Origin response header
app.use(cors());

// Parse incoming request bodies before handlers
app.use(bodyParser.json());

// Set the router controller
router.use(controller);

// Set the controller prefix for versioning
app.use("/api/v1", router);

// Get the port number to lisen on from an env value
const port = process.env.PORT;

// Setup custom error handling middleware
app.use((err, req, res, next) => {
  handleError(err, req, res, next);
});

// Initialize the application
app.listen(port, () => {
  console.log(`mailgun-backend-proxy running on port ${port}`);
});
