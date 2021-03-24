import React from "react";

const AssignAgent = ({ isVisible, close, state, setState, submit, clients }) => {
    return (
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
                                    setState({ ...state, sid: evt.target.value });
                                }}
                            >
                                <option selected={true}>Select Client to Assign</option>
                                {clients.map((el, index) => (
                                    <option key={index} value={el._id}>
                                        {el.name}
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
    );
};

export default AssignAgent;
