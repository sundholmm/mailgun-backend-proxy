const express = require("express");
const cors = require("cors");
const controller = require("./api/controller");
const { handleError } = require("./api/models/error");
const bodyParser = require("body-parser");
require("dotenv").config();

const router = express.Router();
const app = express();

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
router.use(controller);
app.use("/api/v1", router);

const port = process.env.PORT;

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port, () => {
  console.log(`mailgun-backend-proxy running on port ${port}`);
});
