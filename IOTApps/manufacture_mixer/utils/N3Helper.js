const Neon = require("@cityofzion/neon-js");
class N3Helper {
  constructor(contract) {
    this.contract = contract;
  }
  convertParams = (args) =>
    args.map((a) =>
      a.value === undefined
        ? a
        : a.type === 'Address'
        ? Neon.sc.ContractParam.hash160(a.value)
        : a.type === 'ScriptHash'
        ? Neon.sc.ContractParam.hash160(Neon.u.HexString.fromHex(a.value))
        : a.type === 'Array'
        ? Neon.sc.ContractParam.array(...this.convertParams(a.value))
        : a,
    );

  contractInvoke = async (method, args) => {
    const convertedArgs = this.convertParams(args);
    let resp;
    try {
      resp = await this.contract.invoke(method, convertedArgs);
      console.log(resp);
    } catch (e) {
      console.log(e);
      resp = { error: { message: e.message, ...e } };
    }
  };
}

module.exports = N3Helper