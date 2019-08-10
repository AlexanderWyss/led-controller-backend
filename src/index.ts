import {HttpManager} from './manager/HttpManager';
import {BluetoothManager} from './manager/BluetoothManager';
import {Operation} from './operation/Operation';

const bleno = require("@abandonware/bleno");
const express = require("express");
const router = express.Router();

const operations = Operation.getOperations();
const httpManager = new HttpManager(router);
httpManager.mapOperations(operations);

const bluetoothManager = new BluetoothManager(bleno);
bluetoothManager.mapOperations(operations);

module.exports = router;
