from boa3.builtin import public
from boa3.builtin.interop.storage import put, get

@public
def setValue(value:str) :
    put("Hello", value)

@public
def hello() -> str:
    return bytes.to_str(get("Hello"))