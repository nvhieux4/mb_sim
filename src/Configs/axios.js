import axios from "axios";
import jwt_decode from "jwt-decode";
import { API } from "../Common/constant";
import authAPI from "../services/authAPI";

const axiosDefault = axios.create({
    baseURL: API,
    headers: {
        "content-type": "application/json",
    },
});
let refreshTokenRequest = null;
axiosDefault.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("IdToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (token && refreshToken) {
            let date = new Date();
            const decodedToken = jwt_decode(token);
            config.headers.Authorization = "Bearer " + token;
            const isExpired = decodedToken.exp < date.getTime() / 1000;
            if (isExpired) {
                try {
                    refreshTokenRequest = refreshTokenRequest
                        ? refreshTokenRequest
                        : handleRefreshToken();
                    const data = await refreshTokenRequest;
                    refreshTokenRequest = null;
                    console.log("dataaaa", data);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("IdToken");
                    localStorage.setItem("accessToken", data.AccessToken);
                    localStorage.setItem("IdToken", data.IdToken);
                    config.headers.Authorization = "Bearer " + data.IdToken;

                    return config;
                } catch (error) {
                    console.log(error);
                }
            } else return config;
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

const handleRefreshToken = async (config) => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        const data = await authAPI.refreshToken({ refreshToken });
        return data;
    } catch (error) {
        console.log(error);
        alert("Looixxxx");
    }
};

axiosDefault.interceptors.response.use(
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

export default axiosDefault;
