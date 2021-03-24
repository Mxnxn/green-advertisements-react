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
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/agents/getAll`,
                    { uid: uid },
                    HEADER
                );
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
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/addAgent`, formData, HEADER);
                if (!res.data.client) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export let agentBackend = new AgentBackend();
