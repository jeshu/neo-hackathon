#  Food product traceability & transparency using Neo Blockchain :-

## Features

```sh
- Provide complete transparency of Food product processing from raw material procurement to final delivery to end consumer.
- Defining the Quality ownership and accountability of  various stack holders of the  product at every stage.
- Provide complete traceability of product. 
- In blockchain based distributed eco system each participants can have separate app to interact and create a new block.
- In case of Quality check failure measured by any IoT devices, further blocks cannot be created
```

## Projects:

- [Neo Smart Contract](https://github.com/jeshu/neo-hackathon/tree/master/contracts/FoodSafetyContract) 
- Client Apps:
  - [Manufacturing App](https://github.com/jeshu/neo-hackathon/tree/master/clientApps/ManufacturingApp)
  - [Raw Material App](https://github.com/jeshu/neo-hackathon/tree/master/clientApps/RawMaterialApp)
  - [Reader App](https://github.com/jeshu/neo-hackathon/tree/master/clientApps/ReaderApp)
  - [Retail Store App](https://github.com/jeshu/neo-hackathon/tree/master/clientApps/RetailStore)
  - [Warehouse App](https://github.com/jeshu/neo-hackathon/tree/master/clientApps/Warehouse)
- [IOT Server](https://github.com/jeshu/neo-hackathon/tree/master/IoTServer)

## High Level Architecture Diagram: 

![Output](/images/architecture/blockchain_architecture_diagram.png)

## Technology Stack

- [Neo3 Boa](https://dojo.coz.io/neo3/boa/getting-started.html)
- [CityOfZion Neon-js(version 3)](https://dojo.coz.io/neo3/neon-js/docs/)
- [Python](https://www.python.org/)
- [React](https://reactjs.org/)

## Installation

- Install the [Dot Net SDK](https://dotnet.microsoft.com/download)
- Download [Dotnet Express](https://github.com/neo-project/neo-express) using below command:

```sh
dotnet tool install Neo.Express -g
```
- Install the [Visual Studio code](https://code.visualstudio.com/download) and thereafter install the [Neo Blockchain Toolkit Extension](https://marketplace.visualstudio.com/items?itemName=ngd-seattle.neo-blockchain-toolkit) in that.


## Running the Demo

- Navigate to the folder where the solution has been checked out and open the **contracts** folder inside that in the visual studio code.
- Then start the Neo Express by clicking on the button highlighted below:

![Output](/images/neoexpress/snapshot1.png)

- Once the Neo Express is started, transfer some NEO and GAS from **genesis** account to **chirag** account as shown below.

![Output](/images/neoexpress/snapshot2.png)

- Then Deploy the **FoodSafetyContract** smart contract using the option shown below:

![Output](/images/neoexpress/snapshot3.png)

- Then for the all ClientApps under the **clientApps** folder replace the contract hash with the one generated from the step above.In order to replace it, navigate to the **<<clientApp>>/src/constansts/Const.js** and replace the scriptHash key.

- Thereafter navigate to all the Client Apps listed on the Projects section above and follow the steps to run them on your local environment.


## Development Path

Below listed steps were performed to develop this project:

- Installed [Python 3.7 or later](https://www.python.org/downloads/release/python-379/)
- Thereafter we installed the Neo3 Boa dependencies. We performed below listed steps from the root folder:
```sh
cd contracts\FoodSafetyContract
python -m venv venv
venv\Scripts\activate.bat
pip install neo3-boa
```
- In order to compile the Neo contract we ran below command:
```sh
cd contracts\FoodSafetyContract
neo3-boa FoodSafetyContract.py
```
- Installed [NPM](https://nodejs.org/en/download/)
- Then we installed the Neon js by performing below listed steps. This installed Neon js globally on our machine.
```sh
npm install -g @cityofzion/neon-js@next
```



## Product Future Enhancements

## Application Screenshots