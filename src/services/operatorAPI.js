import axiosDefault from "../Configs/axios";

const operatorAPI = {
    operatorsAPI: (limit = 10, changePage = "") => {
        const url = `dev/operators?limit=${limit}${
            changePage
                ? changePage.next === true
                    ? `&nextPage=${changePage.key}`
                    : `&pevPage=${changePage.key}`
                : ""
        }`;
        return axiosDefault.get(url);
    },
    createOperatorAPI: (data) => {
        const token = localStorage.getItem("accessToken");
        const url = `dev/operators?accessToken=${token}`;
        return axiosDefault.post(url, data);
    },
    putOperatorAPI: (id, data) => {
        const token = localStorage.getItem("accessToken");
        const url = `dev/operators/${id}?accessToken=${token}`;
        return axiosDefault.put(url, data);
    },
    deleteOperatorAPI: (id) => {
        const token = localStorage.getItem("accessToken");
        const url = `dev/operators/${id}?accessToken=${token}`;
        return axiosDefault.delete(url);
    },
};

export default operatorAPI;
