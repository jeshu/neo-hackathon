import Neon, { sc } from '@cityofzion/neon-js';
import { rpc, sc as scCore, u } from "@cityofzion/neon-core";
import * as CONST from '../constansts/Const'
export default class N3Helper {
  constructor(contract) {
    this.contract = contract;
  }
  getGasTotalSupply = () => {
    const rpcClient = new rpc.RPCClient(CONST.userPvtKey);
    console.log("--- Current GAS total supply ---");
    // This is a hexstring
    const gasTotalSupplyScript = new scCore.ScriptBuilder()
      .emitContractCall(scCore.GasContract.INSTANCE.totalSupply())
      .build();
  
    //We wrap the script in a HexString class so the SDK can handle the conversion to Base64 for us.
    const payload = u.HexString.fromHex(gasTotalSupplyScript);
    return rpcClient.invokeScript(payload).then((gasTotalSupplyResult) => {
      const gasTotalSupply = gasTotalSupplyResult.stack[0].value;
  
      console.log(`Gas total supply is ${transformGasDecimal(gasTotalSupply)}`);
      console.log(
        `This action took ${transformGasDecimal(
          gasTotalSupplyResult.gasconsumed
        )} GAS to run.\n\n`
      );
    });
  }

  convertParams = (args) =>
    args.map((a) =>
      a.value === undefined
        ? a
        : a.type === 'Address'
        ? sc.ContractParam.hash160(a.value)
        : a.type === 'ScriptHash'
        ? sc.ContractParam.hash160(Neon.u.HexString.fromHex(a.value))
        : a.type === 'Array'
        ? sc.ContractParam.array(...this.convertParams(a.value))
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

  getValue = async ()=>{
    const intent = {
      scriptHash: contractHash,
      operation: 'getNumber',
      params: [33],
      sender:{
        account:'NVfbszHDRnKeTsoshoJQ7EpTouXMnhzj6a',
        scopes: 'CalledByEntry',}
    };
  }
}
