import React from "react";
import { ArrowLeft, ArrowRight, MapPin } from "react-feather";

const AgentViewWithCarousel = ({ el, locationHandler, setAgentUpload, index }) => {
    return (
        <div class="col-sm-12 col-md-6">
            <div class="mb-3 card border-light rounded bx-3d ">
                <div className="card-header bg-light border-light">
                    <div className="fnt-mt-b">
                        # {el.hcode} ({el.size})
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", cursor: "pointer" }}>
                        <MapPin size="14" style={{ verticalAlign: "initial", marginRight: 5, marginTop: 5, color: "black" }} />
                        <div className="fnt-mt-l">{locationHandler(el.location)}</div>
                    </div>
                </div>
                <div className="card-body p-1 ps-r">
                    {el.images.map((elx, index) => (
                        <img
                            src={`${process.env.REACT_APP_API_URL}/${elx.imageUrl}`}
                            // src={elx}
                            id={`${el._id}_${index}`}
                            className={index === 0 ? `img-fluid front-img` : "img-fluid"}
                            alt="Hoarding"
                        />
                    ))}
                    <div className="btn-row">
                        <span
                            className="arrow a-left"
                            onClick={() => {
                                let temp = el.images;
                                for (let indx = 0; indx < temp.length; indx++) {
                                    if (document.getElementById(`${temp[indx].hid}_${indx}`).classList[1] === "front-img") {
                                        if (indx === 0) {
                                            console.log("here");
                                            document.getElementById(`${temp[indx].hid}_${temp.length - 1}`).classList.add("front-img");
                                            document.getElementById(`${temp[indx].hid}_${0}`).classList.remove("front-img");
                                            break;
                                        }
                                        document.getElementById(`${temp[indx].hid}_${indx - 1}`).classList.add("front-img");
                                        document.getElementById(`${temp[indx].hid}_${indx}`).classList.remove("front-img");
                                        break;
                                    }
                                }
                            }}
                        >
                            <ArrowLeft size="15" /> Prev
                        </span>
                        <span className="no-bg ">{el.description}</span>
                        <span
                            className="arrow a-right"
                            onClick={() => {
                                let temp = el.images;
                                for (let indx = 0; indx < temp.length; indx++) {
                                    if (document.getElementById(`${temp[indx].hid}_${indx}`).classList[1] === "front-img") {
                                        // console.log(document.getElementById(temp[indx].hid + "_" + index).classList[1]);
                                        if (indx === temp.length - 1) {
                                            console.log("here");
                                            document.getElementById(`${temp[indx].hid}_${0}`).classList.add("front-img");
                                            document.getElementById(`${temp[indx].hid}_${indx}`).classList.remove("front-img");
                                            break;
                                        }
                                        document.getElementById(`${temp[indx].hid}_${indx + 1}`).classList.add("front-img");
                                        document.getElementById(`${temp[indx].hid}_${indx}`).classList.remove("front-img");
                                        break;
                                    }
                                }
                            }}
                        >
                            Next <ArrowRight size="15" />
                        </span>
                    </div>
                    <div className="btn-row">
                        <span
                            className=" btn btn-success mr-1"
                            style={{ width: "100%", alignItems: "center", justifyContent: "center", borderRadius: 7 }}
                            onClick={() => {
                                setAgentUpload((agentUpload) => ({
                                    ...agentUpload,
                                    hid: el._id,
                                    aid: el.aid,
                                    index: index,
                                    replace: true,
                                }));
                            }}
                        >
                            Upload
                        </span>
                        <span
                            className=" btn btn-danger ml-1"
                            style={{ width: "100%", alignItems: "center", justifyContent: "center", borderRadius: 7 }}
                            onClick={() => {
                                setAgentUpload((agentUpload) => ({
                                    ...agentUpload,
                                    hid: el._id,
                                    aid: el.aid,
                                    index: index,
                                    delete: true,
                                }));
                            }}
                        >
                            Dismiss
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentViewWithCarousel;
