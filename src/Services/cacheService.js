import axios from 'axios';

const SERVICE_URL = 'http://localhost:8080';


const sendConfigurations = (memorySize, fileSize, strategy) => {
    const url = `${SERVICE_URL}/cache/initCache`;
    return axios.post(url, {"cacheType": strategy, "memoryMaxSize": `${memorySize}`, "fileSystemMaxSize": `${fileSize}`});
};

const updateOrder = (orderId) => {
    const url = `${SERVICE_URL}/cache/update/${orderId}`;
    return axios.get(url);
};

const createOrder = (orderNo, orderName, cardType) => {
    const url = `${SERVICE_URL}/cache/add`;
    return axios.post(url, {"orderNo": orderNo, "name": orderName, "cardType": cardType, "accessCount": 0});
};

const getAllOrders = () => {
    const url = `${SERVICE_URL}/cache/getall`;
    return axios.get(url);
};

export {
    sendConfigurations,
    createOrder,
    updateOrder,
    getAllOrders
};
