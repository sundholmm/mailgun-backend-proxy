const express = require("express");
const cors = require("cors");
const controller = require("./api/controller");
const { handleError } = require("./api/models/error");
const bodyParser = require("body-parser");
const helmet = require("helmet");

// Get the env values
require("dotenv").config();

// Setup router
const router = express.Router();

// Setup the express application
const app = express();

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
app.use((err, req, res) => {
  handleError(err, res);
});

// Initialize the application
app.listen(port, () => {
  console.log(`mailgun-backend-proxy running on port ${port}`);
});
