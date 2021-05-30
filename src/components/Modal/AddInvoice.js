import React from "react";

const AddInvoice = ({ isVisible, close, state, submit, clients, setState, name }) => {
	return (
		isVisible && (
			<div className={isVisible ? "modal d-block " : "modal"}>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">{name}</h5>
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
							{state.success && (
								<div class="alert alert-dismissible alert-success">
									<strong>Uploaded successfully!</strong>
								</div>
							)}
							{!state.success && (
								<div class="form-group">
									<span>Client</span>
									<select
										class="custom-select mt-2"
										onChange={(evt) => {
											setState({ ...state, cid: evt.target.value });
										}}
									>
										<option selected={true}>Select Client to Assign</option>
										{clients.map((el, index) => (
											<option key={index} value={el._id}>
												{el.cname}
											</option>
										))}
									</select>
								</div>
							)}
							{!state.success && (
								<div class="form-group">
									<span>Year</span>
									<div class="input-group mt-2">
										<input
											type="text"
											className="form-control"
											value={state.year}
											placeholder="Enter Financial Year"
											onChange={(evt) => {
												setState({ ...state, year: evt.target.value });
											}}
										/>
									</div>
								</div>
							)}
							{!state.success && (
								<div class="form-group">
									<span>Pdfs</span>
									<div class="input-group mt-2">
										<div class="custom-file ">
											<input
												type="file"
												disabled={state.edit}
												multiple
												onChange={(evt) => {
													const files = evt.target.files;
													const validFileType = ["application/pdf"];
													for (let index = 0; index < files.length; index++) {
														const file = files[index];
														if (!validFileType.includes(file["type"])) {
															return setState({
																...state,
																files: [],
																status: "Image format should be jpg, jpeg or png.",
															});
														}
													}
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
													setState({ ...state, files: temp, status: false });
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
							)}
							{!state.success && state.files.length > 0 && (
								<div class="form-group">
									<small className="text-primary">Selected Files</small>
									<div className="input-group mt-2">
										<div>
											{state.files.map((el) => (
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
							{!state.success && (
								<button type="button" class="btn btn-primary" onClick={submit}>
									Assign
								</button>
							)}
							<button type="button" class="btn btn-warning" data-dismiss="modal" onClick={close}>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default AddInvoice;
