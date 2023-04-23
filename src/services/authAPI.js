import axiosAuth from "../Configs/axiosAuth";

const authAPI = {
    loginApi: (data) => {
        const url = "dev/login";
        return axiosAuth.post(url, data);
    },
    refreshToken: (data) => {
        const url = "dev/refresh";
        console.log("Re-");
        return axiosAuth.post(url, data);
    },
};

export default authAPI;
