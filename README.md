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

- [Neo Smart Contract](https://github.com/jeshu/neo-hackathon/tree/backup/27-Jun/contracts/FoodSafetyContract) 
- Client Apps:
  - [Manufacturing App](https://github.com/jeshu/neo-hackathon/tree/backup/27-Jun/clientApps/ManufacturingApp)
  - [Raw Material App](https://github.com/jeshu/neo-hackathon/tree/backup/27-Jun/clientApps/RawMaterialApp)
  - [Reader App](https://github.com/jeshu/neo-hackathon/tree/backup/27-Jun/clientApps/ReaderApp)
  - [Retail Store App](https://github.com/jeshu/neo-hackathon/tree/backup/27-Jun/clientApps/RetailStore)
  - [Warehouse App](https://github.com/jeshu/neo-hackathon/tree/backup/27-Jun/clientApps/Warehouse)
- [IOT Server](https://github.com/jeshu/neo-hackathon/tree/backup/27-Jun/IoTServer)

## High Level Architecture Diagram: 

![Output](/images/architecture/blockchain_architecture_diagram.png)

## Technology Stack

- [Neo3 Boa](https://dojo.coz.io/neo3/boa/getting-started.html)
- [CityOfZion Neon-js(version 3)](https://dojo.coz.io/neo3/neon-js/docs/)
- [Python](https://www.python.org/)
- [React](https://reactjs.org/)

## Installation

Below listed steps were performed to develop this project:

- [Python 3.7 or later](https://www.python.org/downloads/release/python-379/)
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
- [NPM](https://nodejs.org/en/download/)
- Then we installed the Neon js by performing below listed steps. This installed Neon js globally on our machine.
```sh
npm install -g @cityofzion/neon-js@next
```

## Running the Demo

Open your favorite Terminal and run these commands.

## Product Future Enhancements

## Application Screenshots