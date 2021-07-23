import AgentModal from "components/Modal/AgentModal";
import DeleteModal from "components/Modal/DeleteModal";
import Navbar from "components/Navbar";
import React, { useCallback, useEffect, useState } from "react";
import { Plus, Trash } from "react-feather";
import { vendorBackend } from "Vendor/vendorBackend";

const Vendor = (props) => {
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
		statusUpdate: false,
		viewInvoices: false,
		addVendor: false,
		deleteVendor: false,
		deleteFile: false,
		status: false,
		fileStatus: false,
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
			formData.set("name", vendor.name.toUpperCase());
			formData.set("password", vendor.password.toUpperCase());
			formData.set("phone", vendor.phone);
			const res = await vendorBackend.addVendor(formData);
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
			if (error?.response?.data) {
				return setVendor({ ...vendor, status: error.response.data.message });
			}
			setVendor({ ...vendor, status: error.message });
		}
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
			<DeleteModal close={close} submit={deleteVendor} isVisible={vendor.deleteVendor} />
			{state.stopLoading && (
				<div className="jumbotron">
					<div className="row px-3 d-flex">
						<div className="form-group ml-auto">
							<label htmlFor="exampleInputEmail1">Search</label>
							<input
								type="text"
								id="exampleInputEmail1"
								className="form-control border border-primary"
								placeholder="Enter Phone/Name"
								onChange={(evt) => {
									if (evt.target.value !== "") {
										const temp = state.copy.filter(
											(el) =>
												el.name.toUpperCase().match(evt.target.value.toUpperCase()) ||
												el.phone.match(evt.target.value.toUpperCase())
										);
										return setState({ ...state, vendors: [...temp], search: evt.target.value });
									}
									setState({ ...state, vendors: [...state.copy], search: evt.target.value });
								}}
								value={state.search}
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

					<div className="row overflow-auto px-3">
						<table className="table table-hover border">
							<thead>
								<tr>
									<th scope="col">Sr.</th>
									<th scope="col">Name</th>
									<th scope="col">Phone</th>
									<th scope="col">Password</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{state.vendors.map((vendor, index) => (
									<tr key={index}>
										<th scope="row">{index + 1}</th>
										<th scope="row">{vendor.name}</th>
										<th scope="row">{vendor.phone}</th>
										<th scope="row">{vendor.password}</th>
										<th scope="row">
											<button
												className="btn rounded ml-2 btn-sm btn-danger"
												onClick={() => {
													setVendor({ ...vendor, deleteVendor: true, vid: vendor._id });
												}}
											>
												<Trash size={12} />
											</button>
										</th>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	);
};

export default Vendor;
