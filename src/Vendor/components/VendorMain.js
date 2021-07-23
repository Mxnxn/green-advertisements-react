import DeleteModal from "components/Modal/DeleteModal";
import UploadSingleModal from "components/Modal/UploadSingleModal";
import Navbar from "components/Navbar";
import React, { useCallback, useEffect, useState } from "react";
import { Plus, Trash } from "react-feather";
import { vendorBackend } from "Vendor/vendorBackend";

const VendorMain = (props) => {
	const [state, setState] = useState({
		vendor: {},
		copy: [],
		search: "",
		stopLoading: false,
	});

	const blankVendor = {
		vid: window.localStorage.getItem("uid"),
		file: null,
		years: "",
		date: "",
		statusChange: false,
		status: false,
		success: false,
		addLedger: false,
		addInvoice: false,
		view: false,
		rows: {},
		_id: "",
		delete: false,
		type: "",
	};

	const [vendor, setVendor] = useState({
		...blankVendor,
	});

	const getVendors = useCallback(async () => {
		try {
			const res = await vendorBackend.getVendor();
			setState({ ...state, vendor: res.vendors, copy: res.vendors, stopLoading: true });
		} catch (error) {
			console.log(error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getVendors();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getVendors]);

	const close = () => {
		setVendor({ ...blankVendor });
	};

	const uploadInvoice = async () => {
		try {
			const formData = new FormData();
			formData.set("vid", vendor.vid);
			formData.set("year", vendor.years);
			formData.set("date", vendor.date);

			formData.append("invoice", vendor.file);
			const res = vendorBackend.addInvoice(formData);
			setVendor({ ...vendor, success: true, status: false });
			setState({ ...state, vendor: { ...state.vendor, invoices: [...state.vendor.invoice, res.uploaded] } });
			close();
		} catch (error) {
			console.log(error);
		}
	};

	const uploadLedger = async () => {
		try {
			const formData = new FormData();
			formData.set("vid", vendor.vid);
			formData.set("year", vendor.years);
			formData.set("date", vendor.date);
			formData.append("ledger", vendor.file);
			const res = vendorBackend.addLedger(formData);
			setVendor({ ...vendor, success: true, status: false });
			setState({ ...state, vendor: { ...state.vendor, ledgers: [...state.vendor.ledgers, res.uploaded] } });
			close();
		} catch (error) {
			console.log(error);
		}
	};

	const getNames = (fileUrl) => {
		let splitted = fileUrl.split("/")[1];
		let name = splitted.split("_");
		name.splice(0, 1);
		name = name.join("_");
		return name;
	};

	const getDate = (createdAt) => {
		const date = new Date(createdAt);
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
		let mmm = months[date.getMonth()];
		let dd = date.getDate();
		let yyyy = date.getFullYear();
		let hh = date.getHours();
		let mm = date.getUTCMinutes();

		return `${mmm} ${dd} ${yyyy} ${hh}:${mm}`;
	};

	const deleteFile = async () => {
		try {
			const formData = new FormData();
			formData.set("viid", vendor._id);
			formData.set("type", vendor.type);
			await vendorBackend.deleteFile(formData);
			close();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Navbar client={true} />
			<UploadSingleModal
				isVisible={vendor.addInvoice}
				state={vendor}
				setState={setVendor}
				title={"Invoice"}
				close={close}
				submit={uploadInvoice}
			/>
			<UploadSingleModal
				isVisible={vendor.addLedger}
				state={vendor}
				setState={setVendor}
				title={"Ledger"}
				close={close}
				submit={uploadLedger}
			/>
			<DeleteModal isVisible={vendor.delete} close={close} submit={deleteFile} />
			{state.stopLoading && (
				<div className="jumbotron">
					<div className="row px-3 d-flex">
						<h1>Uploads</h1>
						<button
							className="btn btn-outline-primary ml-auto mb-2"
							onClick={() => {
								setVendor({ ...vendor, addInvoice: true });
							}}
						>
							<Plus size="12" /> Invoice
						</button>
						<button
							className="btn btn-outline-primary ml-2 mb-2"
							onClick={() => {
								setVendor({ ...vendor, addLedger: true });
							}}
						>
							<Plus size="12" /> Ledger
						</button>
					</div>
					<div className="row overflow-auto px-3">
						{Object.keys(state.vendor.files).map((el, index) => (
							<button
								onClick={() => {
									setVendor({ ...vendor, view: true, rows: state.vendor.files[el] });
								}}
								className="btn btn-outline-primary mr-2"
							>
								{el}
							</button>
						))}
					</div>
					{vendor.view && (
						<div className="row overflow-auto px-3 my-2">
							<h3 className="my-3">Ledgers</h3>
							<table className="table table-hover border mt-2">
								<thead>
									<th scope="col">Ledger Date</th>
									<th scope="col">Filename</th>
									<th scope="col">Preview</th>
									<th scope="col">Uploaded on</th>
									<th scope="col">Status</th>
									<th scope="col">#</th>
								</thead>
								<tbody>
									{vendor.rows.ledgers.map((el, index) => (
										<tr>
											<th scope="row">{el.date}</th>
											<th scope="row">{getNames(el.fileUrl)}</th>
											<th scope="row">
												<a className="text text-warning" href={`${process.env.REACT_APP_API_URL}/${el.fileUrl}`}>
													Open
												</a>
											</th>
											<th scope="row">{getDate(el.createdAt)}</th>
											<th
												scope="row "
												className={el.status.toUpperCase() === "ACCEPTED" ? "text text-success" : "text text-danger"}
											>
												{el.status}
											</th>
											<th scope="row">
												<button
													onClick={() => {
														setVendor({ ...vendor, type: "LEDGER", _id: el._id, delete: true });
													}}
													className="btn rounded btn-sm btn-danger"
												>
													<Trash size={12} />
												</button>
											</th>
										</tr>
									))}
								</tbody>
							</table>
							<h3 className="my-3">Invoices</h3>
							{vendor.rows.invoices.length < 1 ? (
								<span className="text text-danger my-4 ml-2">Not uploaded</span>
							) : (
								<table className="table table-hover border mt-2">
									<thead>
										<th scope="col">Invoice Date</th>
										<th scope="col">Filename</th>
										<th scope="col">Preview</th>
										<th scope="col">Uploaded on</th>
										<th scope="col">Status</th>
										<th scope="col">#</th>
									</thead>
									<tbody>
										{vendor.rows.invoices.map((el, index) => (
											<tr>
												<th scope="row">{el.date}</th>
												<th scope="row">{getNames(el.fileUrl)}</th>
												<th scope="row">
													<a className="text text-warning" href={`${process.env.REACT_APP_API_URL}/${el.fileUrl}`}>
														Open
													</a>
												</th>
												<th scope="row">{getDate(el.createdAt)}</th>
												<th
													scope="row"
													className={el.status.toUpperCase() === "ACCEPTED" ? "text text-success" : "text text-danger"}
												>
													{el.status}
												</th>
												<th scope="row">
													<button
														onClick={() => {
															setVendor({ ...vendor, type: "INVOICE", _id: el._id, delete: true });
														}}
														className="btn rounded btn-sm btn-danger"
													>
														<Trash size={12} />
													</button>
												</th>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default VendorMain;
