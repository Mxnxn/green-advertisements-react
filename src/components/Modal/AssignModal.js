import React from "react";

const AssignModal = ({ isVisible, close, state, setState, submit, clients }) => {
    return (
        isVisible && (
            <div className={isVisible ? "modal d-block " : "modal"}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Assign Hoarding</h5>
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
                                <select
                                    class="custom-select"
                                    onChange={(evt) => {
                                        setState({ ...state, cid: evt.target.value });
                                    }}
                                >
                                    <option selected disabled value>
                                        Select Client to Assign
                                    </option>
                                    {clients.map((el, index) => (
                                        <option key={index} value={el._id}>
                                            {el.cname ? el.cname : el.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={submit}>
                                Assign
                            </button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={close}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default AssignModal;
