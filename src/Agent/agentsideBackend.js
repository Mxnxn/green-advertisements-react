import axios from "axios";
const uid = window.localStorage.getItem("uid");
const HEADER = {
    headers: {
        "SESSION-TOKEN": window.localStorage.getItem("token"),
    },
};

class AgentSideBackend {
    getAgent() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/agents/get`, { uid: uid }, HEADER);
                if (!res.data.agents) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    resetImage(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/agents/updateImage`, formData, HEADER);
                if (!res.data.message) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    dismissHoarding(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/agents/dismissHoarding`, formData, HEADER);
                if (!res.data.message) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export let agentSideBackend = new AgentSideBackend();
