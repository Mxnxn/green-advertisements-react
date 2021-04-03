import axios from "axios";
const uid = window.localStorage.getItem("uid");
const HEADER = {
    headers: {
        "SESSION-TOKEN": window.localStorage.getItem("token"),
    },
};

class HoardingBackend {
    addHoarding(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/hoarding/add`, data, HEADER);
                if (!res.data.data) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    getClientsList() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/clients/list`, { uid: uid }, HEADER);
                if (!res.data.data) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    getAgentsList() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/agents/list`, { uid: uid }, HEADER);
                if (!res.data.data) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    getAllHoardings() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/hoarding/getAll`, { aid: uid }, HEADER);
                if (!res.data.data) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteHoardings(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/hoarding/delete`, formData, HEADER);
                if (!res.data.message) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    editHoarding(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/hoarding/update`, formData, HEADER);
                if (!res.data.data) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    assignClient(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/hoarding/assign`, formData, HEADER);
                if (!res.data.data) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    suggestClient(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/hoarding/suggestassign`,
                    formData,
                    HEADER
                );
                if (!res.data.data) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    retainClient(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/hoarding/retain`, formData, HEADER);
                if (!res.data.message) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    retainSuggestionClient(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/hoarding/retainSuggestion`,
                    formData,
                    HEADER
                );
                if (!res.data.message) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    assignAgent(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/agents/assign`, formData, HEADER);
                if (!res.data.data) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    retainAgent(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/agents/retain`, formData, HEADER);
                if (!res.data.message) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    resetImage(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/hoarding/updateImage`, formData, HEADER);
                if (!res.data.message) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export let hoardingBackend = new HoardingBackend();
