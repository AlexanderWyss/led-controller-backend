const ArduinoPort = require("./ArduinoPort");

const express = require('express');
const router = express.Router();


const port = new ArduinoPort();

/* GET home page. */
router.get('/wave', function(req, res, next) {
  port.write('!WaveRun')
  res.send('Wave');
});
router.get('/rainbow', function(req, res, next) {
  port.write('!RainbowRun')
  res.send('Rainbow');
});

module.exports = router;
