const express = require("express");
const cors = require("cors");
const controller = require("./api/controller");
const bodyParser = require("body-parser");
require("dotenv").config();
const router = express.Router();

const app = express();

app.use(bodyParser.json());
router.use(controller);
app.use("/api/v1", router);
app.use(cors);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`enepro-backend running on port ${port}`);
});
