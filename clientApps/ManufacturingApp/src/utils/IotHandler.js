const IoTServer = 'http://localhost:3009/iot';
const IoTHandler = async (method, batchId) =>{
  const responce = await fetch(`${IoTServer}/${method}/${batchId}`);
  const data = await responce.json()
  return data
}
export default IoTHandler;