import React, { useState } from "react";
import { Power } from "react-feather";
import { Link } from "react-router-dom";

const Navbar = ({ client }) => {
	const [openMenu, setOpenMenu] = useState(false);

	let url = window.location.pathname.split("/");
	return (
		<nav
			className="navbar navbar-expand-lg navbar-dark bg-primary"
			style={{ paddingTop: 10, paddingLeft: 20, paddingBottom: 10 }}
		>
			<a className="navbar-brand" href={window.location.href}>
				<img src={require("../assets/logo.png").default} alt="logo" style={{ height: "50px" }} />
			</a>
			{!url[2] && (
				<small className="navbar-brand" href={window.location.href}>
					<small>{`Client Portal`}</small>
				</small>
			)}
			{url[2] === "agents" && (
				<small className="navbar-brand" href={window.location.href}>
					<small>{`Agent Portal`}</small>
				</small>
			)}
			<button
				className="navbar-toggler"
				onClick={() => setOpenMenu(!openMenu)}
				type="button"
				data-toggle="collapse"
				data-target="#navbarColor01"
				aria-controls="navbarColor01"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className={openMenu ? "collapse navbar-collapse show " : "collapse navbar-collapse"} id="navbarColor01">
				{client && <ul className="navbar-nav mr-auto"></ul>}
				{!client && (
					<ul className="navbar-nav mr-auto">
						<li className={url[3] === "hoarding" ? "nav-item active" : "nav-item"}>
							<Link to="/admin/hoarding" className="nav-link" style={{ cursor: "pointer" }}>
								Hoarding
							</Link>
						</li>
						<li className={url[3] === "agents" ? "nav-item active" : "nav-item"}>
							<Link to="/admin/agents" className="nav-link" style={{ cursor: "pointer" }}>
								Agents
							</Link>
						</li>
						<li className={url[2] === "admin" && !url[3] ? "nav-item active" : "nav-item"}>
							<Link to="/admin" className="nav-link" style={{ cursor: "pointer" }}>
								Clients
							</Link>
						</li>
						<li className={url[3] === "vendor" ? "nav-item active" : "nav-item"}>
							<Link to="/admin/vendor" className="nav-link" style={{ cursor: "pointer" }}>
								Vendor
							</Link>
						</li>
						<li className={url[3] === "invoice" ? "nav-item active" : "nav-item"}>
							<Link to="/admin/invoice" className="nav-link " style={{ cursor: "pointer" }}>
								Invoice & Ledger
							</Link>
						</li>
					</ul>
				)}
				<div className="form-inline my-2 my-lg-0">
					<span
						className="nav-link text-white"
						style={{ cursor: "pointer" }}
						onClick={() => {
							window.localStorage.removeItem("uid");
							window.localStorage.removeItem("token");
							window.location.reload();
						}}
					>
						<Power className="logout-btn-icn" />
					</span>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
