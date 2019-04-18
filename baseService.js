import axios from 'axios';

const baseUrl = "http://192.168.200.136:3000/"
const BaseService = axios.create(
    {
        baseURL: baseUrl
    }
);

export default BaseService;