import { clientSideBackend } from "Client/clientsideBackend";
import ImageCardWithCarousel from "components/ImageCardWithCarousel";
import LiteNavbar from "Client/components/LiteNavbar";
import React, { useCallback, useEffect, useState } from "react";

const ClientMain = ({ uid }) => {
	const [state, setState] = useState({
		client: {
			hid: [],
			shid: [],
		},
		stopLoading: false,
	});

	const getClient = useCallback(async () => {
		try {
			const res = await clientSideBackend.getClient();
			setState({ ...state, stopLoading: true, client: res.client });
		} catch (error) {
			console.log(error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getClient();
	}, [getClient]);

	const [toggleText, setToggleText] = useState(false);

	const locationHandler = (location) => {
		let letterLenght = window.innerWidth > 1280 ? 35 : 20;
		if (location.length > letterLenght) {
			return (
				<span
					class=""
					id="complete_text"
					onClick={() => {
						setToggleText((prev) => !prev);
					}}
				>
					{toggleText ? (
						<span>
							{location}
							<small className="text-danger">...less</small>
						</span>
					) : (
						<span>
							{location.slice(0, letterLenght)}
							<small className="text-danger">..more</small>
						</span>
					)}
				</span>
			);
		} else {
			return (
				<span id="emailHelp" class="text-muted">
					{location}
				</span>
			);
		}
	};

	const [view, setView] = useState({
		home: true,
		invoice: false,
		ledgers: false,
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
			<LiteNavbar view={view} setView={setView} />
			<div className="jumbotron">
				{state.stopLoading && (
					<>
						{view.home && (
							<div class="container">
								{state.client.hid.length > 0 && (
									<div className="row">
										<div className="col-sm-12 my-4 fnt-mt-b">
											<h1>Your Hoardings</h1>
										</div>
									</div>
								)}
								<div className="row">
									{state.client.hid.length > 0 &&
										state.client.hid.map((el, index) => (
											<ImageCardWithCarousel el={el} locationHandler={locationHandler} />
										))}
								</div>
								{state.client.shid.length > 0 && (
									<div className="row">
										<div className="col-sm-12 my-4 fnt-mt-b">
											<h1>Highly Recommended</h1>
										</div>
									</div>
								)}
								<div className="row">
									{state.client.shid.length > 0 &&
										state.client.shid.map((el, index) => (
											<ImageCardWithCarousel el={el} locationHandler={locationHandler} />
										))}
								</div>
							</div>
						)}
						{view.invoice && (
							<div class="container">
								<div className="row">
									<div className="col-sm-12 my-4 fnt-mt-b">
										<h1>Invoices</h1>
									</div>
								</div>
								<div className="row overflow-auto px-3">
									<table className="table table-hover border ">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Name</th>
												<th scope="col">Action</th>
												<th scope="col">Uploaded on</th>
											</tr>
										</thead>
										<tbody>
											{state.client.invoices.map((el, index) => (
												<tr>
													<th scope="row">{index + 1}</th>
													<th scope="row">{getNames(el.fileUrl)}</th>
													<th scope="row">
														<a
															className="text-info"
															href={`${process.env.REACT_APP_API_URL}/${el.fileUrl}`}
															target="_blank"
															rel="noreferrer"
														>
															View
														</a>
													</th>
													<th scope="col">{getDate(el.createdAt)}</th>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						)}
						{view.ledgers && (
							<div class="container">
								<div className="row">
									<div className="col-sm-12 my-4 fnt-mt-b">
										<h1>Ledgers</h1>
									</div>
								</div>
								<div className="row overflow-auto px-3">
									<table className="table table-hover border ">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Name</th>
												<th scope="col">Action</th>
												<th scope="col">Uploaded on</th>
											</tr>
										</thead>
										<tbody>
											{state.client.ledgers.map((el, index) => (
												<tr>
													<th scope="row">{index + 1}</th>
													<th scope="row">{getNames(el.fileUrl)}</th>
													<th scope="row">
														<a
															className="text-info"
															href={`${process.env.REACT_APP_API_URL}/${el.fileUrl}`}
															target="_blank"
															rel="noreferrer"
														>
															View
														</a>
													</th>
													<th scope="col">{getDate(el.createdAt)}</th>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default ClientMain;
