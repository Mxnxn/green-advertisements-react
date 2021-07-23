import axios from "axios";
const uid = window.localStorage.getItem("uid");
const HEADER = {
	headers: {
		"SESSION-TOKEN": window.localStorage.getItem("token"),
	},
};

class VendorBackend {
	addVendor(formData) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${process.env.REACT_APP_API_URL}/vendor/add`, formData, HEADER);
				if (!res.data.vendor) throw res;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}
	getAllVendor() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${process.env.REACT_APP_API_URL}/vendor/getall`, { aid: uid }, HEADER);
				if (!res.data.vendors) throw res;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}
	getVendor() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${process.env.REACT_APP_API_URL}/vendor/get`, { vid: uid }, HEADER);
				if (!res.data.vendors) throw res;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}

	addInvoice(formData) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${process.env.REACT_APP_API_URL}/vendor/uploadInvoice`, formData, HEADER);
				if (!res.data.uploaded) throw res;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}

	addLedger(formData) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${process.env.REACT_APP_API_URL}/vendor/uploadLedger`, formData, HEADER);
				if (!res.data.uploaded) throw res;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}

	deleteFile(formData) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${process.env.REACT_APP_API_URL}/vendor/delete`, formData, HEADER);
				if (!res.data.message) throw res;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}
	deleteVendor(formData) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${process.env.REACT_APP_API_URL}/vendor/deleteVendor`, formData, HEADER);
				if (!res.data.message) throw res;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}

	statusUpdate(formData) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${process.env.REACT_APP_API_URL}/vendor/statusUpdate`, formData, HEADER);
				if (!res.data.message) throw res;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}
}

export let vendorBackend = new VendorBackend();
