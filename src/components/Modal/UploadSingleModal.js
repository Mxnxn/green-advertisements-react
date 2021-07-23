import React from "react";

const UploadSingleModal = ({ title, isVisible, state, setState, close, submit }) => {
	return (
		<div className={isVisible ? "modal d-block " : "modal"}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						{state.success ? (
							<span className="alert alert-success">Uploaded Successful!</span>
						) : (
							<>
								<div className="form-group">
									<label for="exampleInputEmail1">Year</label>
									<input
										type="text"
										className={state.status ? "form-control border is-invalid" : "form-control border"}
										aria-describedby="emailHelp"
										placeholder="2020-21"
										value={state.years}
										onChange={(evt) => {
											setState({ ...state, years: evt.target.value });
										}}
									/>
								</div>
								<div className="form-group">
									<label for="exampleInputEmail1">date</label>
									<input
										type="date"
										className={state.status ? "form-control border is-invalid" : "form-control border"}
										aria-describedby="emailHelp"
										placeholder="2020-21"
										value={state.date}
										onChange={(evt) => {
											setState({ ...state, date: evt.target.value });
										}}
									/>
								</div>
								<div class="form-group">
									<span>PDF</span>
									<div class="input-group mt-2">
										<div class="custom-file ">
											<input
												type="file"
												disabled={state.edit}
												onChange={(evt) => {
													const file = evt.target.files[0];
													console.log(file);
													const validFileType = ["application/pdf"];
													if (!validFileType.includes(file["type"])) {
														return setState({
															...state,
															status: "Image format should be jpg, jpeg or png.",
														});
													} else {
														setState({ ...state, file: file, status: false });
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
								{state.file && (
									<div class="form-group">
										<small className="text-primary">Selected Files</small>
										<div className="input-group mt-2">
											<div>
												<small className="text-danger">{state.file.name}</small>
											</div>
										</div>
									</div>
								)}
							</>
						)}
					</div>
					<div className="modal-footer">
						<button className="btn btn-danger" onClick={submit}>
							Upload
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

export default UploadSingleModal;
