import axios from "axios";
const uid = window.localStorage.getItem("uid");
const HEADER = {
    headers: {
        "SESSION-TOKEN": window.localStorage.getItem("token"),
    },
};

class ClientSideBackend {
    getClient() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/clients/get`, { uid: uid }, HEADER);
                if (!res.data.client) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export let clientSideBackend = new ClientSideBackend();
