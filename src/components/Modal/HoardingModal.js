import React from "react";

const HoardingModal = ({ title, isVisible, state, setState, close, submit }) => {
	return (
		<div className={isVisible ? "modal d-block" : "modal"}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
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
						{!state.reset && (
							<>
								<div className="form-group">
									<label for="exampleInputEmail1">Hoarding Code</label>
									<input
										className={state.status ? "form-control border is-invalid" : "form-control border"}
										aria-describedby="emailHelp"
										placeholder="Enter Location"
										value={state.hcode}
										onChange={(evt) => {
											setState({ ...state, hcode: evt.target.value });
										}}
									/>
								</div>
								<div className="form-group">
									<label for="exampleInputEmail1">Location</label>
									<input
										className={state.status ? "form-control border is-invalid" : "form-control border"}
										aria-describedby="emailHelp"
										placeholder="Enter Location"
										value={state.location}
										onChange={(evt) => {
											setState({ ...state, location: evt.target.value });
										}}
									/>
								</div>
								<div className="form-group">
									<label for="exampleInputEmail1">Size</label>
									<input
										className={state.status ? "form-control border is-invalid" : "form-control border"}
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
										placeholder="Enter size"
										value={state.size}
										onChange={(evt) => {
											setState({ ...state, size: evt.target.value });
										}}
									/>
								</div>
								<div className="form-group">
									<label for="exampleInputEmail1">Description</label>
									<input
										className="form-control border"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
										placeholder="Enter any information"
										value={state.description}
										onChange={(evt) => {
											setState({ ...state, description: evt.target.value });
										}}
									/>
								</div>
							</>
						)}

						{!state.edit && (
							<div class="form-group">
								<span>Images</span>
								<div class="input-group mt-2">
									<div class="custom-file ">
										<input
											type="file"
											disabled={state.edit}
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
													setState({ ...state, image: temp });
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
						)}
						{state.image.length > 0 && (
							<div class="form-group">
								<small className="text-primary">Selected Files</small>
								<div className="input-group mt-2">
									<div>
										{state.image.map((el) => (
											<div>
												<small className="text-danger">{el.name}</small>
											</div>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary" onClick={submit}>
							Save changes
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

export default HoardingModal;
