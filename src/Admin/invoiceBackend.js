import axios from "axios";
const uid = window.localStorage.getItem("uid");
const HEADER = {
	headers: {
		"SESSION-TOKEN": window.localStorage.getItem("token"),
	},
};

class InvoiceBackend {
	addLedger(formdata) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${process.env.REACT_APP_API_URL}/invoices/uploadLedger`, formdata, HEADER);
				if (!res.data.message) throw res;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}

	addInvoice(formdata) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${process.env.REACT_APP_API_URL}/invoices/uploadInvoice`, formdata, HEADER);
				if (!res.data.message) throw res;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}

	getClientsDetails() {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${process.env.REACT_APP_API_URL}/invoices/get`, { aid: uid }, HEADER);
				if (!res.data.message) throw res;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}

	deleteFile(formData) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await axios.post(`${process.env.REACT_APP_API_URL}/invoices/delete`, formData, HEADER);
				if (!res.data.message) throw res;
				resolve(res.data);
			} catch (error) {
				reject(error);
			}
		});
	}
}

export let invoiceBackend = new InvoiceBackend();
