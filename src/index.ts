import {BluetoothManager} from "./manager/BluetoothManager";
import {HttpManager} from "./manager/HttpManager";
import {OperationService} from "./operation/OperationService";

const bleno = require("@abandonware/bleno");
const express = require("express");
const router = express.Router();

const operations = OperationService.getOperations();
const httpManager = new HttpManager(router);
httpManager.mapOperations(operations);

const bluetoothManager = new BluetoothManager(bleno);
bluetoothManager.mapOperations(operations);

module.exports = router;
