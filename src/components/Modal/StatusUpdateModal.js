import React from "react";

const StatusUpdateModal = ({ isVisible, submit, close, state, setState }) => {
	return (
		isVisible && (
			<div className={isVisible ? "modal d-block" : "modal"}>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Update</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="form-group">
								<button
									className={
										state.fileStatus.toUpperCase() === "ACCEPTED"
											? "btn mr-2 btn-success btn-outline-success"
											: "btn mr-2 btn-outline-success"
									}
									onClick={() => {
										setState({ ...state, fileStatus: "Accepted" });
									}}
								>
									Accept
								</button>
								<button
									className={
										!state.fileStatus.toUpperCase() === "REJECTED"
											? "btn mr-2 btn-danger"
											: "btn mr-2 btn-outline-danger"
									}
									onClick={() => {
										setState({ ...state, fileStatus: "Rejected" });
									}}
								>
									Reject
								</button>
								<button
									disable
									className={
										state.fileStatus.toUpperCase() === "IN PROCESS"
											? "btn mr-2 btn-warning btn-outline-warning"
											: "btn mr-2 btn-outline-warning"
									}
								>
									In Process
								</button>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-success" onClick={submit}>
								Update
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

export default StatusUpdateModal;
