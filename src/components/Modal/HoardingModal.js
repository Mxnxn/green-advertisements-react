import React from "react";

const HoardingModal = ({ title, isVisible, state, setState, close, submit }) => {
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
                        {!state.reset && (
                            <>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Hoarding Code</label>
                                    <input
                                        className={
                                            state.status ? "form-control border is-invalid" : "form-control border"
                                        }
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Location"
                                        value={state.hcode}
                                        onChange={(evt) => {
                                            setState({ ...state, hcode: evt.target.value });
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Location</label>
                                    <input
                                        className={
                                            state.status ? "form-control border is-invalid" : "form-control border"
                                        }
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Location"
                                        value={state.location}
                                        onChange={(evt) => {
                                            setState({ ...state, location: evt.target.value });
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Size</label>
                                    <input
                                        className={
                                            state.status ? "form-control border is-invalid" : "form-control border"
                                        }
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter size"
                                        value={state.size}
                                        onChange={(evt) => {
                                            setState({ ...state, size: evt.target.value });
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Description</label>
                                    <input
                                        className="form-control border"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter any information"
                                        value={state.description}
                                        onChange={(evt) => {
                                            setState({ ...state, description: evt.target.value });
                                        }}
                                    />
                                </div>
                            </>
                        )}
                        {/* <div class="form-group">
                            <select class="custom-select">
                                <option selected="">Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div> */}
                        {!state.edit && (
                            <div class="form-group">
                                <div class="input-group ">
                                    <div class="custom-file ">
                                        <input
                                            type="file"
                                            disabled={state.edit}
                                            onChange={(evt) => {
                                                const file = evt.target.files[0];
                                                if (file) {
                                                    const validFileType = ["image/jpg", "image/jpeg", "image/png"];
                                                    if (validFileType.includes(file["type"])) {
                                                        setState({ ...state, image: evt.target.files[0] });
                                                    } else {
                                                        setState({
                                                            ...state,
                                                            status: "Image format should be jpg, jpeg or png.",
                                                        });
                                                    }
                                                }
                                            }}
                                            class="custom-file-input is-invalid"
                                            id="inputGroupFile02"
                                        />
                                        <label class="custom-file-label" for="inputGroupFile02">
                                            {state.image ? state.image.name : "Choose file"}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
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

export default HoardingModal;
