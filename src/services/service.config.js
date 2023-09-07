import axios from "axios";



//this is the creative service we have done to access axios in a short way manner Plus being able to send as header the token stored in the users local storage plus here we can handle the base URL for when the app is deployed or it's being developed in local host mode
const service = axios.create({
    baseURL: "http://localhost:5005/api"
    // baseURL: import.meta.env.VITE_SERVER_URL,
});

service.interceptors.request.use((config) => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
        config.headers.authorization = `Bearer ${storedToken}`;
    }
    return config;
});

export default service;
