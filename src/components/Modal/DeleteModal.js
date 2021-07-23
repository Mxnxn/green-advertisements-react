import React from "react";

const DeleteModal = ({ isVisible, submit, close }) => {
	return (
		<div className={isVisible ? "modal d-block" : "modal"}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Delete</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<p>Are you sure?</p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary" onClick={submit}>
							Delete
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

export default DeleteModal;
