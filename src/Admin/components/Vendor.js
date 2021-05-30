import AgentModal from "components/Modal/AgentModal";
import DeleteModal from "components/Modal/DeleteModal";
import Navbar from "components/Navbar";
import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Plus, Trash } from "react-feather";
import { vendorBackend } from "Vendor/vendorBackend";

const Vendor = ({ uid }) => {
	const [state, setState] = useState({
		vendors: [],
		copy: [],
		search: "",
		stopLoading: false,
	});

	const blankVendor = {
		aid: window.localStorage.getItem("uid"),
		vid: "",
		name: "",
		phone: "",
		password: "",
		statusChange: false,
		viewInvoices: false,
		addVendor: false,
		delete: false,
		status: false,
	};

	const [vendor, setVendor] = useState({
		...blankVendor,
	});

	const getVendors = useCallback(async () => {
		try {
			const res = await vendorBackend.getAllVendor();
			setState({ ...state, vendors: res.vendors, copy: res.vendors, stopLoading: true });
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

	const addVendor = async () => {
		try {
			const formData = new FormData();
			formData.set("aid", vendor.aid);
			formData.set("name", vendor.name);
			formData.set("password", vendor.password);
			formData.set("phone", vendor.phone);
			const res = vendorBackend.addVendor(formData);
			setState({
				...state,
				vendors: [
					...state.vendors,
					{ _id: res.vendor._id, aid: vendor.aid, name: vendor.name, password: vendor.password, phone: vendor.phone },
				],
				copy: [
					...state.copy,
					{ _id: res.vendor._id, aid: vendor.aid, name: vendor.name, password: vendor.password, phone: vendor.phone },
				],
			});
			close();
		} catch (error) {
			console.log(error);
		}
	};

	const blankView = {
		home: true,
		years: false,
		invoices: false,
		data: {},
		rows: {},
	};

	const [view, setView] = useState({ ...blankView });

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

	const deleteVendor = async () => {
		try {
			const formData = new FormData();
			formData.set("vid", vendor.vid);
			await vendorBackend.deleteVendor(formData);
			let temp = [...state.vendors];
			temp = temp.filter((el) => el._id !== vendor.vid);
			setState({ ...state, vendors: temp });
			setVendor({ ...blankVendor });
			setView({ ...blankView });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Navbar />
			<AgentModal
				isVisible={vendor.addVendor}
				state={vendor}
				setState={setVendor}
				title={"Add Vendor"}
				close={close}
				submit={addVendor}
			/>
			<DeleteModal close={close} submit={deleteVendor} isVisible={vendor.delete} />
			{state.stopLoading && (
				<div className="jumbotron">
					<div className="row px-3 d-flex">
						<div class="form-group ml-auto">
							<label for="exampleInputEmail1 ">Search</label>
							<input
								type="text"
								class="form-control border border-primary"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Enter Phone/Name"
								value={state.search}
								onChange={(evt) => {
									setState({ ...state, search: evt.target.value });
									if (evt.target.value !== "") {
										const temp = state.vendors.filter(
											(el) => el.name.match(evt.target.value) || el.phone.match(evt.target.value)
										);
										setState({ ...state, vendors: [...temp] });
									} else {
										setState({ ...state, vendors: [...state.copy] });
									}
								}}
							/>
						</div>
					</div>
					<div className="row px-3 d-flex">
						<h1>Vendors</h1>
						<button
							className="btn btn-outline-primary ml-auto mb-2"
							onClick={() => {
								setVendor({ ...vendor, addVendor: true });
							}}
						>
							<Plus size="12" /> Add Vendor
						</button>
					</div>

					{view.home && (
						<div className="row overflow-auto px-3">
							<table className="table table-hover border">
								<thead>
									<th scope="col">Sr.</th>
									<th scope="col">Name</th>
									<th scope="col">Phone</th>
									<th scope="col">Password</th>
								</thead>
								<tbody>
									{state.vendors.map((vendor, index) => (
										<tr
											style={{ cursor: "pointer" }}
											onClick={() => {
												setView({ ...view, home: false, years: true, data: vendor });
											}}
										>
											<th scope="row">{index + 1}</th>
											<th scope="row">{vendor.name}</th>
											<th scope="row">{vendor.phone}</th>
											<th scope="row">{vendor.password}</th>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
					{view.years && (
						<>
							<div className="row overflow-auto px-3 my-2">
								<span
									style={{ cursor: "pointer" }}
									onClick={() => {
										setView({ ...view, rows: {}, data: {}, home: true, years: false });
									}}
								>
									<ArrowLeft />
								</span>
								<span style={{ fontSize: 18 }} className="ml-3">
									{view.data.name}
								</span>
								<button
									class="btn rounded ml-2 btn-sm btn-danger"
									onClick={() => {
										setVendor({ ...vendor, delete: true, vid: view.data._id });
									}}
								>
									<Trash size={12} />{" "}
								</button>
							</div>
							<div className="row overflow-auto px-3 my-2">
								{Object.keys(view.data.files).map((el) => (
									<button
										class="btn btn-outline-primary  mt-3 mr-2"
										onClick={() => {
											setView({ ...view, rows: view.data.files[el], invoices: true, years: false });
										}}
									>
										{el}
									</button>
								))}
							</div>
						</>
					)}
					{view.invoices && (
						<>
							<div className="row overflow-auto px-3 my-2">
								<span
									style={{ cursor: "pointer" }}
									onClick={() => {
										setView({ ...view, rows: {}, invoices: false, years: true });
									}}
								>
									<ArrowLeft />
								</span>
							</div>
							<div className="row overflow-auto px-3 my-2">
								<h3 className="my-3">Ledgers</h3>
								<table className="table table-hover border mt-2">
									<thead>
										<th scope="col">Index</th>
										<th scope="col">Filename</th>
										<th scope="col">Preview</th>
										<th scope="col">Uploaded on</th>
										<th scope="col">Status</th>
										<th scope="col">#</th>
									</thead>
									<tbody>
										{view.rows.ledgers.map((el, index) => (
											<tr>
												<th scope="row">{index + 1}</th>
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
								{view.rows.invoices.length < 1 ? (
									<span className="text text-danger my-4 ml-2">Not uploaded</span>
								) : (
									<table className="table table-hover border mt-2">
										<thead>
											<th scope="col">Index</th>
											<th scope="col">Filename</th>
											<th scope="col">Preview</th>
											<th scope="col">Uploaded on</th>
											<th scope="col">Status</th>
											<th scope="col">#</th>
										</thead>
										<tbody>
											{view.rows.invoices.map((el, index) => (
												<tr>
													<th scope="row">{index + 1}</th>
													<th scope="row">{getNames(el.fileUrl)}</th>
													<th scope="row">
														<a className="text text-warning" href={`${process.env.REACT_APP_API_URL}/${el.fileUrl}`}>
															Open
														</a>
													</th>
													<th scope="row">{getDate(el.createdAt)}</th>
													<th
														scope="row"
														className={
															el.status.toUpperCase() === "ACCEPTED" ? "text text-success" : "text text-danger"
														}
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
						</>
					)}
				</div>
			)}
		</>
	);
};

export default Vendor;
