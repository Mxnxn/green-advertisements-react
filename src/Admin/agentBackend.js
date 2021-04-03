import axios from "axios";
const uid = window.localStorage.getItem("uid");
const HEADER = {
    headers: {
        "SESSION-TOKEN": window.localStorage.getItem("token"),
    },
};

class AgentBackend {
    getAllAgents() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/agents/getAll`, { uid: uid }, HEADER);
                if (!res.data.agents) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    addAgent(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/addAgent`, formData, HEADER);
                if (!res.data.agent) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteAgent(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/agents/delete`, formData, HEADER);
                if (!res.data.message) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export let agentBackend = new AgentBackend();
