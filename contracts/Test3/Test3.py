from boa3.builtin import public
from boa3.builtin.interop.storage import put, get

@public
def addRawMaterialQualityCert(batchid:str, value:str) :
    put(batchid, value)

@public
def getRawMaterialQualityCert(batchid:str):
    return bytes.to_str(get(batchid))