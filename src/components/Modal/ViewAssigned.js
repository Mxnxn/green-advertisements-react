import React from "react";

const ViewAssigned = ({ isVisible, state, close }) => {
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
                        <div className="form-group">
                            <table className="table table-hover border">
                                <thead>
                                    <th scope="col">Sr.</th>
                                    <th scope="col">#</th>
                                    <th scope="col">Location</th>
                                </thead>
                                <tbody>
                                    {isVisible &&
                                        state.map((el, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{el.hcode}</td>
                                                <td>{el.location}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={close}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAssigned;
