import React from "react";

const ClientModal = ({ title, isVisible, state, setState, close, submit }) => {
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
                            <div class="alert alert-dismissible alert-danger">
                                <strong>{state.status}</strong>
                            </div>
                        )}
                        <div className="form-group">
                            <label for="exampleInputEmail1">Company Name</label>
                            <input
                                className={state.status ? "form-control border is-invalid" : "form-control border"}
                                aria-describedby="emailHelp"
                                placeholder="Enter Name"
                                value={state.cname}
                                onChange={(evt) => {
                                    setState({ ...state, cname: evt.target.value });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Display Name</label>
                            <input
                                className={state.status ? "form-control border is-invalid" : "form-control border"}
                                aria-describedby="emailHelp"
                                placeholder="Enter Name"
                                value={state.pname}
                                onChange={(evt) => {
                                    setState({ ...state, pname: evt.target.value });
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Phone</label>
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
                            <label for="exampleInputEmail1">Email address</label>
                            <input
                                className="form-control border"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={state.email}
                                onChange={(evt) => {
                                    setState({ ...state, email: evt.target.value });
                                }}
                            />
                            <small classNameName="text-warning">Optional</small>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Password</label>
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
                        <div className="form-group">
                            <label for="exampleInputEmail1">GST IN</label>
                            <input
                                type="text"
                                className="form-control border"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="24EXAMPLE1232Z2"
                                value={state.gst}
                                onChange={(evt) => {
                                    setState({ ...state, gst: evt.target.value });
                                }}
                            />
                            <small classNameName="text-warning">Optional</small>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Address</label>
                            <input
                                type="text"
                                className="form-control border"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Street, Area"
                                value={state.address}
                                onChange={(evt) => {
                                    setState({ ...state, address: evt.target.value });
                                }}
                            />
                            <small classNameName="text-warning">Optional</small>
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

export default ClientModal;
