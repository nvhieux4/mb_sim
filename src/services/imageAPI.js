import axiosDefault from "../Configs/axios";

const imageAPI = {
    uploadImageAPI: (data) => {
        const token = localStorage.getItem("accessToken");
        const url = `dev/images?accessToken=${token}`;
        return axiosDefault.post(url, data);
    },
};

export default imageAPI;
