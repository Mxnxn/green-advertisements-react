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
                                        multiple
                                        onChange={(evt) => {
                                            const files = evt.target.files;
                                            const validFileType = ["image/jpg", "image/jpeg", "image/png"];
                                            for (let index = 0; index < files.length; index++) {
                                                const file = files[index];
                                                if (!validFileType.includes(file["type"])) {
                                                    return setState({
                                                        ...state,
                                                        status: "Image format should be jpg, jpeg or png.",
                                                    });
                                                }
                                            }
                                            if (files.length < 6 && files.length > 0) {
                                                let temp = [];
                                                for (let index = 0; index < files.length; index++) {
                                                    const file = files[index];
                                                    if (validFileType.includes(file["type"])) {
                                                        temp.push(file);
                                                    } else {
                                                        setState({
                                                            ...state,
                                                            status: "Image format should be jpg, jpeg or png.",
                                                        });
                                                    }
                                                }
                                                console.log(temp);
                                                setState({ ...state, images: temp });
                                            } else {
                                                return setState({
                                                    ...state,
                                                    status: "Maximum 5 images are allowed!",
                                                });
                                            }
                                        }}
                                        class="custom-file-input is-invalid"
                                        id="inputGroupFile02"
                                    />
                                    <label class="custom-file-label" for="inputGroupFile02">
                                        Click here to select
                                    </label>
                                </div>
                            </div>
                        </div>
                        {state.images.length > 0 && (
                            <div class="form-group">
                                <small className="text-primary">Selected Files</small>
                                <div className="input-group mt-2">
                                    <div>
                                        {state.images.map((el) => (
                                            <div>
                                                <small className="text-danger">{el.name}</small>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
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
