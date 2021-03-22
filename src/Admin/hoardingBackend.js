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
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/hoarding/add`, data, HEADER);
                if (!res.data.data) throw res;
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    getClientList() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/clients/list`, { uid: uid }, HEADER);
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
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/hoarding/getAll`,
                    { aid: uid },
                    HEADER
                );
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
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/hoarding/delete`, formData, HEADER);
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
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/hoarding/update`, formData, HEADER);
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
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/hoarding/assign`, formData, HEADER);
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
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/hoarding/retain`, formData, HEADER);
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
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/hoarding/updateImage`,
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
}

export let hoardingBackend = new HoardingBackend();
