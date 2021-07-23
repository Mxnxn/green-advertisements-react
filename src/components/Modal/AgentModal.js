import React from "react";

const AgentModal = ({ title, isVisible, state, setState, close, submit }) => {
	return (
		<div className={isVisible ? "modal d-block" : "modal"}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						{state.status && (
							<div className="alert alert-dismissible alert-danger">
								<strong>{state.status}</strong>
							</div>
						)}
						<div className="form-group">
							<label className="exampleInputEmail1">Name</label>
							<input
								className={state.status ? "form-control border is-invalid" : "form-control border"}
								aria-describedby="emailHelp"
								placeholder="Enter Name"
								value={state.name}
								onChange={(evt) => {
									setState({ ...state, name: evt.target.value });
								}}
							/>
						</div>

						<div className="form-group">
							<label className="exampleInputEmail1">Phone</label>
							<input
								className={state.status ? "form-control border is-invalid" : "form-control border"}
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Enter Phone Number"
								disabled={state.edit}
								value={state.phone}
								onChange={(evt) => {
									setState({ ...state, phone: evt.target.value });
								}}
							/>
							{state.edit && <small className={"text-danger"}>Disabled as it can't be changed</small>}
						</div>

						<div className="form-group">
							<label className="exampleInputEmail1">Password</label>
							<input
								type="text"
								className={state.status ? "form-control border is-invalid" : "form-control border"}
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Enter password"
								value={state.password}
								onChange={(evt) => {
									setState({ ...state, password: evt.target.value });
								}}
							/>
							{state.edit && <small className="text-danger">Enter new password to change or Leave empty!</small>}
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary" onClick={submit}>
							Save changes
						</button>
						<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={close}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AgentModal;
