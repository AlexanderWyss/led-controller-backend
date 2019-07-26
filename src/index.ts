import { ArduinoPort } from "./ArduinoPort";
const express = require("express");
const path = require("path");

const router = express.Router();

const port = new ArduinoPort();

function index(res: any) {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../public/")
  });
}

router.get("/", (req: any, res: any, next: any) => {
  index(res);
});
router.get("/wave", (req: any, res: any, next: any) => {
  port.write("!WaveRun");
  index(res);
});
router.get("/rainbow", (req: any, res: any, next: any) => {
  port.write("!RainbowRun");
  index(res);
});

module.exports = router;
