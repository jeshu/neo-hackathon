from boa3.builtin import public
from boa3.builtin.interop.storage import put, get, find;


@public
def validateTemperature(data: str, : str):
  if(key == 'temperature') :
    int temperature = int(data);  
    return True
  return False
@public
def setDryfruitsCert(batchId: str, data: str):
    validateData(data, 'dryfruits')
    put(batchId + '1', data)


@public
def setMilkpowderCert(batchId: str, data: str):
    validateData(data, 'milk')
    put(batchId + '2', data)


@public
def setButterCert(batchId: str, data: str):
    validateData(data, 'butter')
    put(batchId + '3', data)


@public
def setSugerCert(batchId: str, data: str):
    validateData(data, 'suger')
    put(batchId + '4', data)


@public
def setMixtureQuality(batchId: str, data: str):
    validateData(data, 'step1quality')
    put(batchId + '5', data)


@public
def setFrezzingQuality(batchId: str, data: str):
    validateData(data, 'step2quality')
    put(batchId + '6', data)


@public
def setPackingQuality(batchId: str, data: str):
    validateData(data, 'step3quality')
    put(batchId + '7', data)


@public
def setTemperature(batchId: str, data: str):
    validateData(data, 'temperature')
    put(batchId + '8', data)


@public
def setExpiryDate(batchId: str, data: str):
    put(batchId + '9', data)


@public
def setManufactureDate(batchId: str, data: str):
    put(batchId + '10', data)


@public
def setShipmentId(batchId: str, data: str):
    put(batchId + '11', data)


@public
def setShipmentDate(batchId: str, data: str):
    put(batchId + '12', data)


@public
def setShipmentTransportId(batchId: str, data: str):
    put(batchId + '13', data)


@public
def setTemperatureAtShipmentTransport(batchId: str, data: str):
    validateData(data, 'temperature')
    put(batchId + '14', data)


@public
def setWarehouseId(batchId: str, data: str):
    put(batchId + '15', data)


@public
def setTemperatureAtWarehouse(batchId: str, data: str):
    validateData(data, 'temperature')
    put(batchId + '16', data)


@public
def setRetailTransportId(batchId: str, data: str):
    put(batchId + '17', data)


@public
def setRetailInvoice(batchId: str, data: str):
    put(batchId + '18', data)


@public
def setTemperatureAtRetailTransport(batchId: str, data: str):
    validateData(data, 'temperature')
    put(batchId + '19', data)


@public
def setRetailReciveDate(batchId: str, data: str):
    put(batchId + '20', data)


@public
def setTemperatureAtStore(batchId: str, data: str):
    validateData(data, 'temperature')
    put(batchId + '21', data)


@public
def setProductOK(batchId: str, data: bool):
    put(batchId + '0', data)

@public
def setExpection(batchId: str, data: bool):
    put(batchId + 'error', data)

@public
def getAllInfo(batchId:str) :
  return find(batchId)

@public 
def IsProductOK(batchId:str) :
  return get(batchId+'0');

@public 
def GetExeception(batchId:str) :
  return get(batchId+'error'); 