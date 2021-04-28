import React from "react";
import { Trash } from "react-feather";

const ViewAssignedClient = ({ isVisible, state, setAssign, close }) => {
    return (
        <div className={isVisible ? "modal d-block" : "modal"}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Assigned Clients</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <table className="table table-hover border">
                                <thead style={{ background: "#F7F7F9", fontSize: "12px" }}>
                                    <th scope="col">Company Name</th>
                                    <th scope="col">Personal Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Action</th>
                                </thead>
                                <tbody>
                                    {isVisible &&
                                        state.sid.map((el, index) => (
                                            <tr>
                                                <td>{el.cname}</td>
                                                <td>{el.pname}</td>
                                                <td>{el.phone}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-danger  ml-2"
                                                        style={{ borderRadius: 10 }}
                                                        onClick={() => {
                                                            setAssign((prev) => ({
                                                                ...prev,
                                                                scid: el._id,
                                                                deleteSuggestion: true,
                                                                viewAssignedSuggestion: false,
                                                            }));
                                                        }}
                                                    >
                                                        <Trash size="12" />
                                                    </button>
                                                </td>
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

export default ViewAssignedClient;
