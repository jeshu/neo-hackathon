from boa3.builtin import public
from boa3.builtin.interop.storage import put, get

@public
def init() -> bool:
    put("Hello", "World")
    return True

@public
def hello() -> str:
    return bytes.to_str(get("Hello"))