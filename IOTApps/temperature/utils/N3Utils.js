const Neon = require('@cityofzion/neon-js');

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
 
 module.exports = {
  account,
  contract,
  transformGasDecimal,
};
