import React, { useState } from "react";
import { authBackend } from "../authbackend";
import { Link } from "react-router-dom";
const Login = (props) => {
	const [state, setState] = useState({
		email: "",
		password: "",
		status: "",
	});

	const login = async () => {
		setState({ ...state, status: false });
		console.log(state);
		if (state.email === "" || state.password === "") {
			return setState({ ...state, status: "Fields Can't be empty!" });
		}
		try {
			if (state.email.includes("@")) {
				const res = await authBackend.loginWithEmailAndPassword({
					email: state.email,
					password: state.password,
				});
				window.localStorage.setItem("uid", res.uid);
				window.localStorage.setItem("token", res.token);
				window.localStorage.setItem("mode", "ADMIN");

				window.location.reload();
			} else {
				const res = await authBackend.loginWithPhoneAndPassword({
					phone: state.email,
					password: state.password,
				});
				window.localStorage.setItem("uid", res.uid);
				window.localStorage.setItem("token", res.token);
				window.localStorage.setItem("mode", "ADMIN");
				window.location.reload();
			}
		} catch (error) {
			if (error.response?.data) {
				setState({ ...state, status: error.response.data.message });
			} else {
				setState({ ...state, status: error.message });
			}
		}
	};

	return (
		<div className="bs-docs-section ">
			<div className="col-lg-4 jumbotron mx-auto mt-4 h-100 shadow">
				<h1 class="">ADMIN</h1>
				{state.status && (
					<div class="alert alert-dismissible alert-danger">
						<strong>{state.status}</strong>
					</div>
				)}
				<div class="form-group">
					<label for="exampleInputEmail1">Email address/Phone</label>
					<input
						class="form-control border"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Enter email or Phone Number"
						value={state.email}
						onChange={(evt) => {
							setState({ ...state, email: evt.target.value });
						}}
					/>
					<small id="emailHelp" class="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Password</label>
					<input
						type="password"
						class="form-control border"
						id="exampleInputPassword1"
						placeholder="Password"
						value={state.password}
						onChange={(evt) => {
							setState({ ...state, password: evt.target.value });
						}}
					/>
					<small id="emailHelp" class="form-text text-muted">
						We respect your privacy.
					</small>
				</div>
				<div className="lead">
					<button onClick={login} className="btn btn-primary">
						Login
					</button>
				</div>
				<small id="emailHelp" class="form-text text-muted mt-4">
					Switch to{" "}
					<Link to="/" className="text-danger">
						Client Login
					</Link>
				</small>
				<small id="emailHelp" class="form-text text-muted mt-2">
					Switch to{" "}
					<Link to="/agents/" className="text-danger">
						Agent Login
					</Link>
				</small>
				<small id="emailHelp" class="form-text text-muted mt-2">
					Switch to{" "}
					<Link to="/vendor/" className="text-danger">
						Vendor Login
					</Link>
				</small>
			</div>
		</div>
	);
};

export default Login;
