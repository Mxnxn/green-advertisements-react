import React from "react";

const ImagePreview = ({ isVisible, url, close, deleteImage }) => {
	return (
		<div className={isVisible ? "modal d-block " : "modal"}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Image</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<img className="preview-img" src={url} alt="img" />
					</div>
					<div className="modal-footer">
						<button className="btn btn-danger" onClick={deleteImage}>
							Delete
						</button>
						<button className="btn btn-primary" onClick={close}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImagePreview;
