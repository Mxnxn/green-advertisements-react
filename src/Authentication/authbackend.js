import axios from "axios";

class Authbackend {
    loginWithPhoneAndPassword(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/loginWithPhone`, formData);
                if (!response.data.message) throw response.data;
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    loginClient(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/clients/login`, formData);
                if (!response.data.message) throw response.data;
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    loginAgent(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/agents/login`, formData);
                if (!response.data.message) throw response.data;
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    loginWithEmailAndPassword(formData) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/loginWithEmail`, formData);
                if (!response.data.message) throw response.data;
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export let authBackend = new Authbackend();
