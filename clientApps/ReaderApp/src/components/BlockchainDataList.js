import React, { useState } from 'react';
import { connect } from 'react-redux';

import { rpcAddress, scriptHash, userPvtKey } from '../constansts/Const';
import { rpc, sc, wallet, tx, u } from '@cityofzion/neon-core';
import { Form, Grid, Header, Segment, Divider } from 'semantic-ui-react';

const mapping = [
  { key: 'Dry fruits certificate', value: '' },
  { key: 'Milk certificate', value: '' },
  { key: 'Flavor certificate', value: '' },
  { key: 'Suger certificate', value: '' },
  { key: 'IoT | Mixture Quality', value: '' },
  { key: 'IoT | Freezing Quality', value: '' },
  { key: 'IoT | Packing Quality', value: '' },
  { key: 'IoT | Temperature at manufacture', value: '' },
  { key: 'Expiry Date', value: '' },
  { key: 'Manufacturing Date', value: '' },
  { key: 'Shipment ID', value: '' },
  { key: 'Shipment Date', value: '' },
  { key: 'Shipment Transport ID', value: '' },
  { key: 'IoT | Temperature At Shipment Transport', value: '' },
  { key: 'Warehouse ID', value: '' },
  { key: 'Warehouse Recive Date', value: '' },
  { key: 'IoT | Temperature At Warehouse', value: '' },
  { key: 'Retail Transport ID', value: '' },
  { key: 'Retail Invoice ID', value: '' },
  { key: 'IoT | Temperature At Retail Transport', value: '' },
  { key: 'Retail Store ID', value: '' },
  { key: 'Recive at Retail date', value: '' },
  { key: 'IoT | Temperature At Store', value: '' },
];

const BlockchainDataList = (props) => {
  const [batchId, setBatchId] = useState();
  const [data, setData] = useState();

  // const intMapping = [4, 5, 6, 7, 13, 16, 19, 22];
  const fetchBlockchainData = () => {
    const sb = new sc.ScriptBuilder();
    const rpcClient = new rpc.RPCClient(rpcAddress);
    const account = new wallet.Account(userPvtKey);

    sb.emitAppCall(scriptHash, 'getAllInfo', [batchId]);
    console.log(account.scriptHash);
    rpcClient
      .invokeScript(u.HexString.fromHex(sb.str), [
        {
          account: account.scriptHash,
          scopes: tx.WitnessScope.CalledByEntry,
        },
      ])
      .then((res) => {
        console.log(res.stack[0]);
        const dataMap = res.stack[0].value.map((item) => {
          const val = u.HexString.fromBase64(item.value).toAscii().split('|');
          // console.log(val[0], val[1], parseInt(val[0].replace(batchId, '')) - 1);
          val[0] = parseInt(val[0].replace(batchId, ''));
          return val;
        });
        // console.log(dataMap.sort((a, b) => parseInt(a[0]) > parseInt(b[0])));
        const dataFinal = mapping.map((el, index) => {
          const item = dataMap.find((item) => item[0] === 1 + index);
          const value =
            item &&
            (el.key.indexOf('IoT') !== -1 ? item[1].charCodeAt(0) : item[1]);
          return [el.key, value];
        });
        // console.log(dataFinal);
        setData(dataFinal);
      });
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' color='blue' textAlign='center'>
          Blockchain data explorer
        </Header>
        <Divider />
        <Form size='large'>
          <Segment raised>
            <Form.Input
              fluid
              icon='box'
              iconPosition='left'
              placeholder='Please enter batch Id'
              action={{
                content: 'Search',
                onClick: (e) => {
                  fetchBlockchainData();
                },
              }}
              onChange={(e) => {
                setBatchId(e.target.value);
              }}
            />
          </Segment>
        </Form>
        {data && (
          <Segment.Group>
            {data.map((item) => (
              <Segment textAlign='left'>
                <Header as='h3'>
                  <Header.Subheader>{item[0]}</Header.Subheader>
                  {item[1]}
                </Header>
              </Segment>
            ))}
          </Segment.Group>
        )}
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    blockchain: state.blockchain,
  };
};

export default connect(mapStateToProps, null)(BlockchainDataList);
