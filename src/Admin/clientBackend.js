import axios from "axios";
const uid = window.localStorage.getItem("uid");
const HEADER = {
    headers: {
        "SESSION-TOKEN": window.localStorage.getItem("token"),
    },
};

class ClientBackend {
    addClient(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/addClient`, formData, HEADER);
                if (!res.data.client) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    getAllClients() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/clients/getAll`, { uid: uid }, HEADER);
                if (!res.data.clients) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    updateClient(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/clients/update`, data, HEADER);
                if (!res.data.client) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteClient(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/clients/delete`, data, HEADER);
                if (!res.data.message) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export let clientBackend = new ClientBackend();
