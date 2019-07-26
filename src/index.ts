import { ArduinoPort } from "./ArduinoPort";
const express = require("express");

const router = express.Router();

const port = new ArduinoPort();

/* GET home page. */
router.get("/wave", (req: any, res: any, next: any) => {
  port.write("!WaveRun");
  res.send("Wave");
});
router.get("/rainbow", (req: any, res: any, next: any) => {
  port.write("!RainbowRun");
  res.send("Rainbow");
});

module.exports = router;
