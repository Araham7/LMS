import "dotenv/config"; // importing the `dotenv`(environment-variable-data).
import axios from "axios"; // importing the `axios`.

const BASE_URL = process.env.BASE_URL; // getting the `BASE_URL` from `dotenv`.

const axiosInstance = axios.create(); // Creating an instance of axios.
axiosInstance.defaults.baseURL = BASE_URL; // Setting the `BASE_URL` of axios.
axiosInstance.defaults.withCredentials = true; // Enabling credentials.
axiosInstance.defaults.timeout = 30000; // Setting timeout to 30 seconds (30000 ms).


export default axiosInstance; // Exporting axios instance.
