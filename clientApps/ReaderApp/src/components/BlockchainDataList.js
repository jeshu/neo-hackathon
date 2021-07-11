import React, { useState } from 'react';
import { connect } from 'react-redux';

import { rpcAddress, scriptHash, userPvtKey } from '../constansts/Const';
import { rpc, sc, wallet, tx, u } from '@cityofzion/neon-core';
import { Form, Grid, Header, Segment, Divider } from 'semantic-ui-react';


const mapping = [
    "Dry fruits certificate",
    "Milk certificate",
    "Flavor certificate",
    "Suger certificate",
    "IoT | Mixture Quality",
    "IoT | Freezing Quality",
    "IoT | Packing Quality",
    "IoT | Temperature at manufacture",
    "Expiry Date",
    "Manufacturing Date",
    "Shipment ID",
    "Shipment Date",
    "Shipment Transport ID",
    "IoT | Temperature At Shipment Transport",
    "Warehouse ID",
    "Warehouse Recive Date",
    "IoT | Temperature At Warehouse",
    "Retail Transport ID",
    "Retail Invoice ID",
    "IoT | Temperature At Retail Transport",
    "Retail Store ID",
    "Recive at Retail date",
    "IoT | Temperature At Store",
]


const BlockchainDataList = (props) => {
  const [batchId, setBatchId] = useState();
  const [data, setData] = useState();
  
  const intMapping = [4,5,6,7,13,16,19,22]
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
          const val =  u.HexString.fromBase64(item.value)
          .toAscii()
          .split('|');
          console.log(val[0], val[1]);
          val[0] = mapping[parseInt(val[0].replace(batchId, '')) -1]
          if(val[0] && val[0].indexOf('IoT') !== -1) {
            val[1] = val[1].charCodeAt(0);
          }
          return val;
        });
        setData(dataMap);
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
          <Segment.Group >
            {data.map((item) => (
              
              <Segment textAlign='left'>
                <Header as='h3'>
                <Header.Subheader>
                {item[0]}
                </Header.Subheader>
                  {item[1]}
              </Header></Segment>
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
