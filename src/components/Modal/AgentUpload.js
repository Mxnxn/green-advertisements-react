import React from "react";

const AgentUpload = ({ isVisible, close, submit, setState, state }) => {
    return (
        <div className={isVisible ? "modal d-block" : "modal"}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Client</h5>
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
                        <div class="form-group">
                            <div class="input-group ">
                                <div class="custom-file ">
                                    <input
                                        type="file"
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
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onClick={submit}>
                            Upload
                        </button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={close}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentUpload;
