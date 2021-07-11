const Neon = require('@cityofzion/neon-js');

const scriptHash = '0xd887122a40fa042cd6343f07f1f98c4929117d59';
const rpcAddress = 'http://localhost:50012';
const userPvtKey =
  '38921c670ecbf38d4889e5db306793754d23b53412a5fc7604c8f6c959798ec5';

const account = (userPvtKey) => new Neon.wallet.Account(userPvtKey);
const contract = (scriptHash, rpcAddress, userPvtKey) =>
  new Neon.experimental.SmartContract(Neon.u.HexString.fromHex(scriptHash), {
    networkMagic: 711206589,
    rpcAddress: rpcAddress,
    account: account(userPvtKey),
  });

const transformGasDecimal = (num) => {
  if (num.length <= 8) {
    return '0.' + num.padStart(8, '0');
  }
  const decimalPoint = num.length - 8;
  return (
    num.substring(0, decimalPoint) +
    '.' +
    num.substring(decimalPoint, num.length)
  );
};

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

const randomQuality = () => {
  return 88 + Math.ceil(Math.random() * 10);
};

const randomTemperatur = () => {
  return -17 + Math.ceil(Math.random() * 6);
};

const NeoIot = async ( method,batchId, isTemperature) => {
  try {
    const neoHelper = new N3Helper(
      contract(
        scriptHash,
        rpcAddress,
        userPvtKey,
      ),
    );
    const data = await neoHelper.contractInvoke(method, [
      {
        type: 'String',
        value: batchId,
      },
      {
        type: 'Integer',
        value: isTemperature ? randomTemperatur() : randomQuality(),
      },
    ]);
    console.log(data);
    return {...data,  message:'success'};
  } catch (error) {
    return {
      message:'error ouccred',
      error,
    };
  }
};

module.exports = NeoIot;
