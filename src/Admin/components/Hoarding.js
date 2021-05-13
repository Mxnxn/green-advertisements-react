import React, { useCallback, useEffect, useState } from "react";
import { Plus } from "react-feather";
import Navbar from "components/Navbar";
import HoardingModal from "components/Modal/HoardingModal";
import { hoardingBackend } from "Admin/hoardingBackend";
import ImagePreview from "components/Modal/ImagePreview";
import AssignModal from "components/Modal/AssignModal";
import AssignAgent from "components/Modal/AssignAgent";
import DisassignModal from "components/Modal/DisassignModal";
import DeleteModal from "components/Modal/DeleteModal";
import ViewAssignedClient from "components/Modal/ViewAssignedClient";
import AssignButton from "./AssignButton";
import ListButton from "./ListButton";
import SuggestButton from "./SuggestButton";
import AgentAssign from "./AgentAsign";
import EditButton from "./EditButton";
import ResetButton from "./ResetButton";
import DeleteButton from "./DeleteButton";
const Hoarding = (props) => {
	const blankHoaring = {
		size: "",
		aid: window.localStorage.getItem("uid"),
		description: "",
		location: "",
		assigned: "",
		imageUrl: "",
		index: "",
		hid: "",
		hcode: "",
		image: [],
		delete: false,
		edit: false,
		view: false,
		add: false,
		reset: false,

		title: "",
	};

	const blankAssign = {
		cid: "",
		hid: "",
		imageid: "",
		sid: [],
		view: false,
		delete: false,
		index: "",
		deleteSuggestion: false,
		viewSuggestion: false,
		viewAgent: false,
		viewAssignedSuggestion: false,
		deleteAgent: false,
	};

	const [hoarding, setHoarding] = useState({ ...blankHoaring });
	const [state, setState] = useState({ hoardings: [], stopLoading: false, search: "" });
	const [assign, setAssign] = useState({ ...blankAssign });
	const close = () => {
		setHoarding({ ...blankHoaring });
		setAssign({ ...blankAssign });
	};

	const getALL = useCallback(async () => {
		try {
			const res = await hoardingBackend.getAllHoardings();
			const clients = await hoardingBackend.getClientsList();
			const agents = await hoardingBackend.getAgentsList();
			setState({
				hoardings: [...res.data],
				copy: [...res.data],
				clients: [...clients.data],
				agents: [...agents.data],
				stopLoading: true,
			});
		} catch (error) {
			console.log(error);
			if (error.response && error.response.data.message === "Unauthorized.") {
				window.localStorage.removeItem("uid");
				window.localStorage.removeItem("token");
				window.location.reload();
			}
		}
	}, []);

	useEffect(() => {
		getALL();
		return () => {};
	}, [getALL]);

	const addHoarding = async () => {
		console.log("here");
		try {
			const formData = new FormData();
			for (let index = 0; index < hoarding.image.length; index++) {
				formData.append(`images`, hoarding.image[index]);
			}
			formData.set("size", hoarding.size);
			formData.set("location", hoarding.location);
			formData.set("description", hoarding.description);
			formData.set("hcode", hoarding.hcode);
			formData.set("aid", hoarding.aid);
			const res = await hoardingBackend.addHoarding(formData);
			setState({ ...state, hoardings: [...state.hoardings, { ...res.data }] });
			close();
		} catch (error) {
			console.log(error);
		}
	};

	const assignClient = async () => {
		if (!assign.cid || !assign.hid) {
			return setAssign({ ...assign, status: "Select Client before Assign!" });
		}
		try {
			const formData = new FormData();
			formData.set("cid", assign.cid);
			formData.set("hid", assign.hid);
			const res = await hoardingBackend.assignClient(formData);
			const temp = [...state.hoardings];
			temp[assign.index].cid = res.data.cid;
			const indexx = temp[assign.index].scid.findIndex((el) => el._id === temp[assign.index].cid._id);
			temp[assign.index].scid.splice(indexx, 1);
			setState({ ...state, hoardings: [...temp] });
			close();
		} catch (error) {
			console.log(error);
			if (error.response && error.response.data) return setAssign({ ...assign, status: error.response.data.message });
		}
	};

	const assignSuggestionClient = async () => {
		if (!assign.cid || !assign.hid) {
			return setAssign({ ...assign, status: "Select Client before Assign!" });
		}
		try {
			const formData = new FormData();
			formData.set("cid", assign.cid);
			formData.set("hid", assign.hid);
			const res = await hoardingBackend.suggestClient(formData);
			const temp = [...state.hoardings];
			temp[assign.index].scid = res.data.scid;
			setState({ ...state, hoardings: [...temp] });
			close();
		} catch (error) {
			console.log(error);
			if (error.response && error.response.data) return setAssign({ ...assign, status: error.response.data.message });
		}
	};

	const assignAgent = async () => {
		console.log(assign);
		if (!assign.sid || !assign.hid) {
			return setAssign({ ...assign, status: "Select Agent before Assign!" });
		}
		try {
			const formData = new FormData();
			formData.set("sid", assign.sid);
			formData.set("hid", assign.hid);
			const res = await hoardingBackend.assignAgent(formData);
			const temp = [...state.hoardings];
			temp[assign.index].sid = res.data.sid;
			setState({ ...state, hoardings: [...temp] });
			close();
		} catch (error) {
			console.log(error);
			if (error.response && error.response.data) return setAssign({ ...assign, status: error.response.data.message });
		}
	};

	const retainAgent = async () => {
		try {
			const formData = new FormData();
			formData.set("sid", assign.sid);
			formData.set("hid", assign.hid);
			await hoardingBackend.retainAgent(formData);
			const temp = [...state.hoardings];
			temp[assign.index].sid = null;
			setState({ ...state, hoardings: [...temp] });
			close();
		} catch (error) {
			console.log(error);
			if (error.response && error.response.data) return setAssign({ ...assign, status: error.response.data.message });
		}
	};

	const retainHoarding = async () => {
		try {
			const formData = new FormData();
			formData.set("cid", assign.cid);
			formData.set("hid", assign.hid);
			await hoardingBackend.retainClient(formData);
			const temp = [...state.hoardings];
			temp[assign.index].cid = null;
			setState({ ...state, hoardings: [...temp] });
			close();
		} catch (error) {
			console.log(error);
			if (error.response && error.response.data) return setAssign({ ...assign, status: error.response.data.message });
		}
	};

	const retainSuggestedHoarding = async () => {
		try {
			const formData = new FormData();
			formData.set("cid", assign.scid);
			formData.set("hid", assign.hid);
			const res = await hoardingBackend.retainSuggestionClient(formData);
			const temp = [...state.hoardings];
			temp[assign.index].scid = [...res.data.scid];
			setState({ ...state, hoardings: [...temp] });
			close();
		} catch (error) {
			console.log(error);
			if (error.response && error.response.data) return setAssign({ ...assign, status: error.response.data.message });
		}
	};

	const editHoarding = async () => {
		try {
			const formData = new FormData();
			formData.set("hid", hoarding.hid);
			formData.set("size", hoarding.size);
			formData.set("description", hoarding.description);
			formData.set("location", hoarding.location);
			formData.set("hcode", hoarding.hcode);
			const res = await hoardingBackend.editHoarding(formData);
			if (res.message) {
				let temp = [...state.hoardings];
				temp[hoarding.index].size = hoarding.size;
				temp[hoarding.index].description = hoarding.description;
				temp[hoarding.index].location = hoarding.location;
				setState({ ...state, hoardings: [...temp] });
				close();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteHoarding = async () => {
		try {
			const formData = new FormData();
			formData.set("hid", hoarding.hid);
			await hoardingBackend.deleteHoardings(formData);
			let temp = [...state.hoardings];
			console.log(temp, hoarding.index);
			temp.splice(hoarding.index, 1);
			setState({ ...state, hoardings: [...temp] });
			close();
		} catch (error) {
			console.log(error);
		}
	};

	const resetHoarding = async () => {
		if (!hoarding.image) {
			setHoarding({ ...hoarding, status: "Please Select Image" });
		}
		try {
			const formData = new FormData();
			formData.set("hid", hoarding.hid);
			formData.set("aid", hoarding.aid);
			for (let index = 0; index < hoarding.image.length; index++) {
				formData.append(`images`, hoarding.image[index]);
			}
			const res = await hoardingBackend.resetImage(formData);
			if (res.message) {
				let temp = [...state.hoardings];
				temp[hoarding.index].images = res.url;
				setState({ ...state, hoardings: [...temp] });
				close();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteImage = async () => {
		try {
			const formData = new FormData();
			formData.set("imageid", hoarding.imageid);
			formData.set("hid", hoarding.hid);
			await hoardingBackend.deleteImage(formData);
			const temp = [...state.hoardings];
			const hindex = temp.findIndex((el) => el._id === hoarding.hid);
			const images = temp[hindex].images.filter((el) => el._id !== hoarding.imageid);
			temp[hindex].images = images;
			setState({ ...state, hoarding: temp });
			close();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Navbar />
			{state.stopLoading && (
				<>
					<HoardingModal
						title={hoarding.title}
						isVisible={hoarding.add}
						state={hoarding}
						setState={setHoarding}
						close={close}
						submit={addHoarding}
					/>
					<HoardingModal
						title={hoarding.title}
						isVisible={hoarding.edit}
						state={hoarding}
						setState={setHoarding}
						close={close}
						submit={editHoarding}
					/>
					<HoardingModal
						title={hoarding.title}
						isVisible={hoarding.reset}
						state={hoarding}
						setState={setHoarding}
						close={close}
						submit={resetHoarding}
					/>
					<ImagePreview deleteImage={deleteImage} isVisible={hoarding.view} url={hoarding.imageUrl} close={close} />
					<AssignModal
						isVisible={assign.view}
						close={close}
						state={assign}
						setState={setAssign}
						clients={state.clients}
						submit={assignClient}
					/>
					<DisassignModal isVisible={assign.delete} close={close} submit={retainHoarding} />
					<AssignModal
						isVisible={assign.viewSuggestion}
						close={close}
						state={assign}
						setState={setAssign}
						clients={state.clients}
						submit={assignSuggestionClient}
					/>
					<DisassignModal
						isVisible={assign.deleteSuggestion}
						close={() =>
							setAssign((prev) => ({
								...prev,
								deleteSuggestion: false,
								viewAssignedSuggestion: true,
							}))
						}
						submit={retainSuggestedHoarding}
					/>
					<AssignAgent
						isVisible={assign.viewAgent}
						close={close}
						state={assign}
						setState={setAssign}
						clients={state.agents}
						submit={assignAgent}
					/>
					<DisassignModal isVisible={assign.deleteAgent} close={close} submit={retainAgent} />
					<DeleteModal isVisible={hoarding.delete} close={close} submit={deleteHoarding} />
					<ViewAssignedClient
						isVisible={assign.viewAssignedSuggestion}
						close={close}
						setAssign={setAssign}
						state={assign}
					/>
				</>
			)}
			<div className="jumbotron">
				<div className="row px-3 d-flex">
					<div class="form-group ml-auto">
						<label for="exampleInputEmail1 ">Search</label>
						<input
							type="email"
							class="form-control border border-primary"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							placeholder="Enter Location"
							rel="noreferrer"
							value={state.search}
							onChange={(evt) => {
								if (evt.target.value.length === 0) {
									return setState({ ...state, hoardings: [...state.copy] });
								}
								setState({ ...state, search: evt.target.value });
								let str = evt.target.value;
								const temp = state.copy.filter(
									(el) =>
										el.location.toUpperCase().match(str.toUpperCase()) ||
										el.description.toUpperCase().match(str.toUpperCase()) ||
										el.size.match(str.toUpperCase())
								);
								console.log(temp);
								setState({ ...state, hoardings: [...temp] });
							}}
						/>
					</div>
				</div>
				<div className="row px-3 d-flex">
					<h1>Hoardings</h1>
					<button
						className="btn btn-outline-primary ml-auto mb-2"
						onClick={() => {
							setHoarding({ ...hoarding, add: true, title: "Add Hoarding" });
						}}
					>
						<Plus size="12" /> Add
					</button>
				</div>
				<div className="row overflow-auto px-3">
					<table className="table table-hover border ">
						<thead>
							<tr>
								<th scope="col">Sr.</th>
								<th scope="col">Size</th>
								<th scope="col">Description</th>
								<th scope="col">Location</th>
								<th scope="col">Current View</th>
								<th scope="col">Assigned</th>
								<th scope="col">Suggested</th>
								<th scope="col">Agent</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						{state.stopLoading && (
							<tbody>
								{state.hoardings.map((elem, index) => (
									<tr class="table-light">
										<td>{elem.hcode}</td>
										<td>{elem.size}</td>
										<td>{elem.description}</td>
										<td>{elem.location}</td>
										<td style={{ display: "flex", flexDirection: "column", padding: "10px 20px" }}>
											{elem.images.map((elx, index) => (
												<small
													onClick={() => {
														setHoarding({
															...hoarding,
															imageid: elx._id,
															hid: elem._id,
															imageUrl: `${process.env.REACT_APP_API_URL}/${elx.imageUrl}`,
															view: true,
														});
													}}
													style={{ cursor: "pointer" }}
												>
													Preview {index + 1}
												</small>
											))}
										</td>
										<td>
											<AssignButton elem={elem} setAssign={setAssign} index={index} />
										</td>
										<td>
											<ListButton elem={elem} setAssign={setAssign} index={index} />
											<SuggestButton elem={elem} setAssign={setAssign} index={index} />
										</td>
										<td>
											<AgentAssign elem={elem} setAssign={setAssign} index={index} />
										</td>
										<td>
											<EditButton elem={elem} setHoarding={setHoarding} index={index} />
											<ResetButton elem={elem} setHoarding={setHoarding} index={index} />
											<DeleteButton elem={elem} setHoarding={setHoarding} index={index} />
										</td>
									</tr>
								))}
							</tbody>
						)}
					</table>
				</div>
			</div>
		</>
	);
};

export default Hoarding;
