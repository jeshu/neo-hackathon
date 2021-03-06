from boa3.builtin import public
from boa3.builtin.interop.storage import put, get, find
from typing import Any, cast

KEY_TEMP = 'temperature'
KEY_QUALITY = 'temperature'

TEMP_RANGE = range(-22, -18)
QUALITY_MIN = 90


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
def setFlavorCert(batchId: str, data: str):
    put(batchId + '3', data)


@public
def setSugerCert(batchId: str, data: str):
    put(batchId + '4', data)


@public
def setMixtureQuality(batchId: str, data: int):
    isValid = validateData(data, KEY_QUALITY)
    put(batchId + '5', data)
    if isValid == False:
        put(batchId + 'error', 'Quality in step 1 (Mixutre) is not OK, ')


@public
def setViscosityQuality(batchId: str, data: int):
    isValid = validateData(data, KEY_QUALITY)
    put(batchId + '6', data)
    if isValid == False:
        put(batchId + 'error', 'Quality in step 2 (Viscosity) is not OK, ')


@public
def setPackingQuality(batchId: str, data: int):
    isValid = validateData(data, KEY_QUALITY)
    put(batchId + '7', data)
    if isValid == False:
        put(batchId + 'error', 'Quality in step 3 (Packing) is not OK, ')


@public
def setTemperature(batchId: str, data: int):
    isValid = validateData(data, KEY_TEMP)
    put(batchId + '8', data)
    if isValid == False:
        put(batchId + 'error', 'Temperature at factory not in range, ')


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
    put(batchId + '14', data)
    if isValid == True:
        put(batchId + 'error', 'Temperature at shipment transport not in range, ')


@public
def setWarehouseId(batchId: str, data: str):
    put(batchId + '15', data)


@public
def setWarehouseReciveDate(batchId: str, data: str):
    put(batchId + '16', data)


@public
def setTemperatureAtWarehouse(batchId: str, data: int):
    isValid = validateData(data, KEY_TEMP)
    put(batchId + '17', data)
    if isValid == False:
        put(batchId + 'error', 'Temperature at warehouse not in range, ')


@public
def setRetailTransportId(batchId: str, data: str):
    put(batchId + '18', data)


@public
def setRetailInvoice(batchId: str, data: str):
    put(batchId + '19', data)


@public
def setTemperatureAtRetailTransport(batchId: str, data: int):
    isValid = validateData(data, KEY_TEMP)
    put(batchId + '20', data)
    if isValid == False:
        put(batchId + 'error', 'Temperature at retail transport not in range, ')


@public
def setRetailStoreId(batchId: str, data: str):
    put(batchId + '21', data)


@public
def setRetailReciveDate(batchId: str, data: str):
    put(batchId + '22', data)


@public
def setTemperatureAtStore(batchId: str, data: int):
    isValid = validateData(data, KEY_TEMP)
    put(batchId + '23', data)
    if isValid == False:
        put(batchId + 'error', 'Temperature at retail store not in range, ')


@public
def setProductOK(batchId: str, data: bool):
    put(batchId + '0', data)


@public
def setExpection(batchId: str, data: bool):
    put(batchId + 'error', data)


@public
def IsProductOK(batchId: str) -> bool:
    return bytes.to_bool(get(batchId+'0'))


@public
def getAllInfo(batchId: str) -> Any:
    allInfo = []
    data = find(batchId)
    while data.next():
        currentObject = data.value
        allInfo.append(bytes.to_str(cast(
            bytes, currentObject[0])) + "|" + bytes.to_str(cast(bytes, currentObject[1])))
    return allInfo


@public
def GetExeception(batchId: str) -> str:
    return bytes.to_str(get(batchId+'error'))
