from boa3.builtin import public
from boa3.builtin.interop.storage import put, get, find;

KEY_TEMP = 'temperature';
KEY_QUALITY = 'temperature';

TEMP_RANGE = range(-22, -18);
QUALITY_MIN = 90;


def validateData(data: int, key: str) -> bool:
  if(key == KEY_TEMP and data in TEMP_RANGE):
    return True
  if(key == KEY_QUALITY and data > QUALITY_MIN):
    return True
  if(key == KEY_QUALITY and data > QUALITY_MIN):
    return True
  return False


@public
def setDryfruitsCert(batchId: str, data: str):
    put(batchId + '1', data)


@public
def setMilkpowderCert(batchId: str, data: str):
    put(batchId + '2', data)


@public
def setButterCert(batchId: str, data: str):
    put(batchId + '3', data)


@public
def setSugerCert(batchId: str, data: str):
    put(batchId + '4', data)


@public
def setMixtureQuality(batchId: str, data: int):
    isValid = validateData(data, KEY_QUALITY)
    if isValid == True:
      put(batchId + '5', data)
    else:
      put(batchId + 'error', 'Quality in step 1 (Mixutre) is not OK, ');


@public
def setFreezingQuality(batchId: str, data: int):
    isValid = validateData(data, KEY_QUALITY)
    if isValid == True:
      put(batchId + '6', data)
    else:
      put(batchId + 'error', 'Quality in step 2 (Freezing) is not OK, ');


@public
def setPackingQuality(batchId: str, data: int):
    isValid = validateData(data, KEY_QUALITY)
    if isValid == True:
      put(batchId + '7', data)
    else:
      put(batchId + 'error', 'Quality in step 3 (Packing) is not OK, ');


@public
def setTemperature(batchId: str, data: int):
  isValid = validateData(data, KEY_TEMP)
  if isValid == True:
    put(batchId + '8', data)
  else:
    put(batchId + 'error', 'Temperature at factory not in range, ');


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
def setShipmentTransportId(batchId: str, data: int):
    put(batchId + '13', data)


@public
def setTemperatureAtShipmentTransport(batchId: str, data: int):
  isValid = validateData(data, KEY_TEMP)
  if isValid == True:
    put(batchId + '14', data)
  else:
    put(batchId + 'error', 'Temperature at shipment transport not in range, ');


@public
def setWarehouseId(batchId: str, data: str):
    put(batchId + '15', data)


@public
def setTemperatureAtWarehouse(batchId: str, data: int):
  isValid = validateData(data, KEY_TEMP)
  if isValid == True:
    put(batchId + '14', data)
  else:
    put(batchId + 'error', 'Temperature at warehouse not in range, ');


@public
def setRetailTransportId(batchId: str, data: str):
    put(batchId + '17', data)


@public
def setRetailInvoice(batchId: str, data: str):
    put(batchId + '18', data)


@public
def setTemperatureAtRetailTransport(batchId: str, data: int):
  isValid = validateData(data, KEY_TEMP)
  if isValid == True:
    put(batchId + '19', data)
  else :
    put(batchId + 'error', 'Temperature at retail transport not in range, ');
    

@public
def setRetailReciveDate(batchId: str, data: str):
    put(batchId + '20', data)


@public
def setTemperatureAtStore(batchId: str, data: int):
  isValid = validateData(data, KEY_TEMP)
  if isValid == True:
    put(batchId + '21', data)
  else :
    put(batchId + 'error', 'Temperature at retail store not in range, ');


@public
def setProductOK(batchId: str, data: bool):
    put(batchId + '0', data)

@public
def setExpection(batchId: str, data: bool):
    put(batchId + 'error', data)

@public
def getAllInfo(batchId:str) -> list:
  allInfo = [];
  data = find(batchId)
  for key in data:
    allInfo.append(bytes.to_str(key) + '|' + bytes.to_str(data[key]));
  
  return allInfo;

@public 
def IsProductOK(batchId:str) -> bool:
  return bytes.to_bool(get(batchId+'0'));

@public 
def GetExeception(batchId:str) -> str:
  return bytes.to_str(get(batchId+'error')); 
