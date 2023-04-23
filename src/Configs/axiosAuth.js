import axios from "axios";
import { API } from "../Common/constant";

const axiosAuth = axios.create({
    baseURL: API,
    headers: {
        "content-type": "application/json",
    },
});

axiosAuth.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        throw error;
    }
);

export default axiosAuth;
