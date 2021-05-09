import React, { useState } from "react";
import { Power } from "react-feather";
const LiteNavbar = ({ view, setView }) => {
	const [openMenu, setOpenMenu] = useState(false);

	return (
		<nav
			className="navbar navbar-expand-lg navbar-dark bg-primary"
			style={{ paddingTop: 10, paddingLeft: 20, paddingBottom: 10 }}
		>
			<a className="navbar-brand" href={window.location.href}>
				<img src={require("../../assets/logo.png").default} alt="logo" style={{ height: "50px" }} />
			</a>
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
				<ul className="navbar-nav mr-auto">
					<li
						className={view.home ? "nav-link active" : "nav-link"}
						onClick={() => {
							setView({ ...view, ledgers: false, home: true, invoice: false });
						}}
					>
						Home
					</li>
					<li
						className={view.invoice ? "active nav-link" : "nav-link"}
						onClick={() => {
							setView({ ...view, ledgers: false, home: false, invoice: true });
						}}
					>
						Invoice
					</li>
					<li
						className={view.ledgers ? "active nav-link" : "nav-link"}
						onClick={() => {
							setView({ ...view, ledgers: true, home: false, invoice: false });
						}}
					>
						Ledger
					</li>
				</ul>
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

export default LiteNavbar;
