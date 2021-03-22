import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const [openMenu, setOpenMenu] = useState(false);

    let url = window.location.pathname.split("/");

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="/">
                GREEN ADVERTISERS
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
            <div
                className={openMenu ? "collapse navbar-collapse show " : "collapse navbar-collapse"}
                id="navbarColor01"
            >
                <ul className="navbar-nav mr-auto">
                    {/* <li className="nav-item">
            <a className="nav-link" href="#">Login
            </a>
        </li> */}
                    <li className={url[1] === "admin" && !url[2] ? "nav-item active" : "nav-item"}>
                        <Link to="/admin" className="nav-link" style={{ cursor: "pointer" }}>
                            Clients
                        </Link>
                    </li>
                    <li className={url[2] === "hoarding" ? "nav-item active" : "nav-item"}>
                        <Link to="/admin/hoarding" className="nav-link" style={{ cursor: "pointer" }}>
                            Hoarding
                        </Link>
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
                        Logout
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
