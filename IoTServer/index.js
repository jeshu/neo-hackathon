const express = require('express');
const NeoIot = require('./NeoIoT');
var cors = require('cors');
const app = express();
const port = 3009;

app.use(cors());
const getTempIoTMethod = (unit) => {
  let methodName = 'setTemperature';
  switch (unit) {
    case 'manufacture':
      methodName = 'setTemperature';
      break;
    case 'warehouseshipment':
      methodName = 'setTemperatureAtShipmentTransport';
      break;
    case 'warehouse':
      methodName = 'setTemperatureAtWarehouse';
      break;
    case 'retailshipment':
      methodName = 'setTemperatureAtRetailTransport';
      break;
    case 'retailstore':
      methodName = 'setTemperatureAtStore';
      break;
  }
  return methodName;
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/iot/packing/:batchId', async function (req, res) {
  const batchId = req.params.batchId;
  const data = await NeoIot('setPackingQuality', batchId, false);
  res.send(data);
});

app.get('/iot/viscosity/:batchId', async function (req, res) {
  const batchId = req.params.batchId;
  const data = await NeoIot('setViscosityQuality', batchId, false);
  res.send(data);
});

app.get('/iot/mixing/:batchId', async function (req, res) {
  const batchId = req.params.batchId;
  const data = await NeoIot('setMixtureQuality', batchId, false);
  res.send(data);
});

app.get('/iot/temperature/:unit/:batchId', async function (req, res) {
  const batchId = req.params.batchId;
  const method = getTempIoTMethod(req.params.unit);
  const data = await NeoIot(method, batchId, false);
  res.send(data);
});
