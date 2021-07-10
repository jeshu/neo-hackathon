const N3Helper = require('./utils/N3Helper');
const N3Utils = require('./utils/N3Utils');
const N3Constanst = require('./constansts/Const');

const batchId = process.argv[2];
const iotMethod = process.argv[3];

const randomQuality = () =>{
  return 88 + Math.ceil(Math.random() * 10)
}
const saveBlockChainData = async () => {
  console.log(N3Utils);
  const neoHelper = new N3Helper(
    N3Utils.contract(
      N3Constanst.scriptHash,
      N3Constanst.rpcAddress,
      N3Constanst.userPvtKey,
    ),
  );
  neoHelper.contractInvoke('setFreezingQuality', [
    {
      type: 'String',
      value: batchId,
    },
    {
      type: 'Integer',
      value: randomQuality(),
    },
  ]);
};

saveBlockChainData();
