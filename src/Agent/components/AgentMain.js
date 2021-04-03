import AgentUpload from "components/Modal/AgentUpload";
import Navbar from "components/Navbar";
import React, { useCallback, useEffect, useState } from "react";
import { agentSideBackend } from "../agentsideBackend";
const AgentMain = ({ uid }) => {
    const [state, setState] = useState({
        agent: {
            hid: [],
        },
        stopLoading: false,
    });

    const [agentUpload, setAgentUpload] = useState({
        hid: "",
        image: null,
        replace: false,
        index: "",
        status: "",
    });

    const resetHoarding = async () => {
        if (!agentUpload.image) {
            setAgentUpload({ ...agentUpload, status: "Please Select Image" });
        }
        try {
            const formData = new FormData();
            formData.set("hid", agentUpload.hid);
            formData.append("image", agentUpload.image);
            const res = await agentSideBackend.resetImage(formData);
            if (res.message) {
                let x = { ...state.agent };
                let temp = [...state.agent.hid];
                temp[agentUpload.index].imageUrl = res.url;
                x.hid.splice(agentUpload.index, 1);
                x.hid.splice(agentUpload.index, 0, temp[agentUpload.index]);
                setState({ ...state, agent: x });
                setAgentUpload({ ...agentUpload, replace: false, image: null });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getClient = useCallback(async () => {
        try {
            const res = await agentSideBackend.getAgent();
            setState({ ...state, stopLoading: true, agent: res.agents });
        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getClient();
    }, [getClient]);

    return (
        <>
            <Navbar client={true} />
            <AgentUpload
                isVisible={agentUpload.replace}
                state={agentUpload}
                setState={setAgentUpload}
                close={() => {
                    setAgentUpload({ ...agentUpload, replace: false, image: null });
                }}
                submit={resetHoarding}
            />
            <div className="jumbotron">
                {state.stopLoading && (
                    <div class="container">
                        {state.agent.hid.length > 0 && (
                            <div className="row">
                                <div className="col-sm-12 my-4">
                                    <h1>Your Jobs</h1>
                                </div>
                            </div>
                        )}
                        <div className="row">
                            {state.agent.hid.length > 0 &&
                                state.agent.hid.map((el, index) => (
                                    <div class="col-sm-12 col-md-4">
                                        <div class="card border-light mb-3">
                                            <div class="card-header border-light bg-light">
                                                <div class="fnt-mt-b">
                                                    {el.hcode} ({el.size})
                                                </div>
                                                <div className="fnt-mt-l">{el.location}</div>
                                            </div>
                                            <div class="card-body p-1">
                                                <div className="mb-2">
                                                    <img
                                                        src={`${process.env.REACT_APP_API_URL}/${el.imageUrl}`}
                                                        class="img-fluid "
                                                        alt="jobpicture"
                                                    />
                                                </div>
                                            </div>
                                            <div className="card-footer bg-light border-light">
                                                <span
                                                    className="hyperlink my-2 fnt-mt-b"
                                                    onClick={() => {
                                                        setAgentUpload({
                                                            ...agentUpload,
                                                            hid: el._id,
                                                            index: index,
                                                            replace: true,
                                                        });
                                                    }}
                                                >
                                                    Upload
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AgentMain;
