import { invoiceBackend } from "Admin/invoiceBackend";
import AddInvoice from "components/Modal/AddInvoice";
import Navbar from "components/Navbar";
import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";

const Invoice = (props) => {
	const [state, setState] = useState({
		clients: [],
		stopLoading: false,
	});

	const blankUpload = {
		files: [],
		cid: "",
		year: "",
		aid: window.localStorage.getItem("uid"),
		status: false,
		success: false,
		addInvoice: false,
		addLedger: false,
	};

	const [upload, setUpload] = useState({
		...blankUpload,
	});

	const getAll = useCallback(async () => {
		try {
			const filteredClient = await invoiceBackend.getClientsDetails();
			setState((state) => ({
				...state,
				clients: [...filteredClient.data],
				status: false,
				stopLoading: true,
			}));
		} catch (error) {}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		getAll();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getAll]);

	const close = () => {
		setUpload({ ...blankUpload });
	};

	const uploadInvoice = async () => {
		if (upload.files.length < 1 || !upload.cid || !upload.year) {
			return setUpload({ ...upload, status: "Something is missing!" });
		}
		try {
			const formData = new FormData();
			formData.set("aid", upload.aid);
			formData.set("cid", upload.cid);
			formData.set("year", upload.year);

			for (let index = 0; index < upload.files.length; index++) {
				const element = upload.files[index];
				formData.append("files", element);
			}
			formData.set("aid", upload.aid);
			await invoiceBackend.addInvoice(formData);
			setUpload({ ...upload, success: true });
		} catch (error) {
			console.log(error);
		}
	};

	const uploadLedger = async () => {
		try {
			if (upload.files.length < 1 || !upload.cid || !upload.year) {
				return setUpload({ ...upload, status: "Something is missing!" });
			}
			try {
				const formData = new FormData();
				formData.set("aid", upload.aid);
				formData.set("cid", upload.cid);
				formData.set("year", upload.year);

				for (let index = 0; index < upload.files.length; index++) {
					const element = upload.files[index];
					formData.append("files", element);
				}
				formData.set("aid", upload.aid);
				await invoiceBackend.addLedger(formData);
				setUpload({ ...upload, success: true });
			} catch (error) {
				console.log(error);
			}
		} catch (error) {}
	};

	const [view, setView] = useState({
		displayYear: false,
		displayRows: false,
		files: [],
		yearlyData: [],
	});

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

	return (
		<>
			<Navbar />
			{state.stopLoading && (
				<>
					{!view.displayYear && !view.displayRows && (
						<div className="jumbotron">
							<div className="row px-3 d-flex">
								<div class="form-group">
									{/* <label for="exampleInputEmail1 ">Search</label> */}
									{/* <br></br> */}
									<button
										className="btn btn-primary"
										onClick={() => {
											setUpload((prev) => ({ ...prev, addInvoice: true }));
										}}
									>
										+ Invoice
									</button>
									<button
										className="btn btn-primary ml-3"
										onClick={() => {
											setUpload((prev) => ({ ...prev, addLedger: true }));
										}}
									>
										+ Ledger
									</button>
								</div>
							</div>
							<div className="row px-3 d-flex">
								<table className="table table-hover border">
									<thead>
										<th scope="col">#</th>
										<th scope="col">Company</th>
										<th scope="col">Name</th>
										<th scope="col">Phone</th>
										<th scope="col">Invoices</th>
										<th scope="col">Ledgers</th>
									</thead>
									<tbody>
										{state.clients.map((client, index) => (
											<tr
												style={{ cursor: "pointer" }}
												onClick={() => {
													setView({ ...view, displayYear: true, files: client.files });
												}}
											>
												<th scope="row">{index + 1}</th>
												<th scope="row">{client.cname}</th>
												<th scope="row">{client.pname}</th>
												<th scope="row">{client.phone}</th>
												<th scope="row">{client.totalInvoices}</th>
												<th scope="row">{client.totalLedgers}</th>
											</tr>
										))}
									</tbody>
								</table>
								<small class="text-danger">Tap on row to explore</small>
							</div>
							<AddInvoice
								isVisible={upload.addInvoice}
								submit={uploadInvoice}
								close={close}
								state={upload}
								setState={setUpload}
								clients={state.clients}
								name={"Add Invoice"}
							/>
							<AddInvoice
								isVisible={upload.addLedger}
								submit={uploadLedger}
								close={close}
								state={upload}
								setState={setUpload}
								clients={state.clients}
								name={"Add Ledger"}
							/>
						</div>
					)}
					{view.displayYear && !view.displayRows && (
						<div className="jumbotron">
							<div className="row px-3 d-flex mb-4" style={{ cursor: "pointer" }}>
								<ArrowLeft
									onClick={() => {
										setView({ ...view, displayRows: false, displayYear: false, files: {}, yearlyData: {} });
									}}
								/>
							</div>
							<div className="row px-3 d-flex mb-2">
								{Object.keys(view.files).length < 1 ? <h3>No Data Available</h3> : <h3>Select Year</h3>}
							</div>
							<div className="row px-3 d-flex">
								{Object.keys(view.files).map((el, index) => {
									return (
										<div
											class="btn btn-outline-primary mr-2"
											onClick={() => {
												setView({ ...view, displayYear: false, displayRows: true, yearlyData: view.files[el] });
											}}
										>
											{el}
										</div>
									);
								})}
							</div>
						</div>
					)}
					{!view.displayYear && view.displayRows && (
						<div className="jumbotron">
							<div className="row px-3 d-flex mb-4" style={{ cursor: "pointer" }}>
								<ArrowLeft
									onClick={() => {
										setView({ ...view, displayRows: false, displayYear: true });
									}}
								/>
							</div>
							<div className="row px-3 d-flex mb-2">
								<h3>Ledgers</h3>
							</div>
							<div className="row px-3 d-flex">
								{view.yearlyData.ledgers.length > 0 ? (
									<table className="table table-hover border">
										<thead>
											<th scope="col">#</th>
											<th scope="col">Name</th>
											<th scope="col">Preview</th>
											<th scope="col">Uploaded on</th>
										</thead>
										<tbody>
											{view.yearlyData.ledgers.map((ledger, index) => (
												<tr key={index}>
													<th scope="row">{index + 1}</th>
													<th scope="row">{getNames(ledger.fileUrl)}</th>
													<th scope="row">
														<a
															className="text-info"
															href={`${process.env.REACT_APP_API_URL}/${ledger.fileUrl}`}
															target="_blank"
															rel="noreferrer"
														>
															View
														</a>
													</th>
													<th scope="row">{getDate(ledger.createdAt)}</th>
												</tr>
											))}
										</tbody>
									</table>
								) : (
									<h5 class="mt-2 text-muted">No Ledger Uploaded</h5>
								)}
							</div>
							<div className="row px-3 d-flex mt-4">
								<h3>Invoices</h3>
							</div>
							<div className="row px-3 d-flex">
								<table className="table table-hover border">
									<thead>
										<th scope="col">#</th>
										<th scope="col">Name</th>
										<th scope="col">Preview</th>
										<th scope="col">Uploaded on</th>
									</thead>
									<tbody>
										{view.yearlyData.invoices.map((invoice, index) => (
											<tr key={index}>
												<th scope="row">{index + 1}</th>
												<th scope="row">{getNames(invoice.fileUrl)}</th>
												<th scope="row">
													<a
														className="text-info"
														href={`${process.env.REACT_APP_API_URL}/${invoice.fileUrl}`}
														target="_blank"
														rel="noreferrer"
													>
														View
													</a>
												</th>
												<th scope="row">{getDate(invoice.createdAt)}</th>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default Invoice;
