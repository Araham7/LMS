// import "dotenv/config"; // importing the `dotenv`(environment-variable-data).

import axios from "axios"; // importing the `axios`.

// const BASE_URL = process.env.BASE_URL; // getting the `BASE_URL` from `dotenv`.
const BASE_URL = "https://my-lms-backend-server-private.onrender.com/api/v1"; /* https://my-lms-backend-server-private.onrender.com */ /* http://localhost:8523/api/v1 */


// console.log(BASE_URL); // "BASE_URL" => This is server URL.


const axiosInstance = axios.create(); // Creating an instance of axios.
axiosInstance.defaults.baseURL = BASE_URL; // Setting the `BASE_URL` of axios.
axiosInstance.defaults.withCredentials = true; // Enabling credentials.
axiosInstance.defaults.timeout = 30000; // Setting timeout to 30 seconds (30000 ms).


export default axiosInstance; // Exporting axios instance.
