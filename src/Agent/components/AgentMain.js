import AgentUpload from "components/Modal/AgentUpload";
import DeleteModal from "components/Modal/DeleteModal";
import Navbar from "components/Navbar";
import React, { useCallback, useEffect, useState } from "react";
import { agentSideBackend } from "../agentsideBackend";
import AgentViewWithCarousel from "./ImageViewWithCarousel";
const AgentMain = ({ uid }) => {
    const [state, setState] = useState({
        agent: {
            hid: [],
        },
        stopLoading: false,
    });

    const [agentUpload, setAgentUpload] = useState({
        hid: "",
        sid: "",
        images: [],
        replace: false,
        delete: false,
        index: "",
        status: "",
    });

    const resetHoarding = async () => {
        if (agentUpload.images.length < 1) {
            setAgentUpload({ ...agentUpload, status: "Please Select Image" });
        }
        try {
            const formData = new FormData();
            formData.set("hid", agentUpload.hid);
            formData.set("aid", state.agent.aid);
            for (let index = 0; index < agentUpload.images.length; index++) {
                formData.append(`images`, agentUpload.images[index]);
            }
            const res = await agentSideBackend.resetImage(formData);
            if (res.message) {
                let x = { ...state.agent };
                let temp = [...state.agent.hid];
                temp[agentUpload.index].images = res.url;
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
            setAgentUpload({ ...agentUpload, sid: res.agents._id });
        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getClient();
    }, [getClient]);

    const [toggleText, setToggleText] = useState(false);

    const locationHandler = (location) => {
        let letterLenght = window.innerWidth > 1280 ? 45 : 20;
        if (location.length > letterLenght) {
            return (
                <span
                    class=""
                    id="complete_text"
                    onClick={() => {
                        setToggleText((prev) => !prev);
                    }}
                >
                    {toggleText ? (
                        <span>
                            {location}
                            <small className="text-danger">...less</small>
                        </span>
                    ) : (
                        <span>
                            {location.slice(0, letterLenght)}
                            <small className="text-danger">..more</small>
                        </span>
                    )}
                </span>
            );
        } else {
            return (
                <span id="emailHelp" class="text-muted">
                    {location}
                </span>
            );
        }
    };

    const dismissHoarding = async () => {
        try {
            const formData = new FormData();
            formData.set("hid", agentUpload.hid);
            formData.set("sid", agentUpload.sid);
            await agentSideBackend.dismissHoarding(formData);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar client={true} />
            <AgentUpload
                isVisible={agentUpload.replace}
                state={agentUpload}
                setState={setAgentUpload}
                close={() => {
                    setAgentUpload({ ...agentUpload, replace: false, delete: false, images: [] });
                }}
                submit={resetHoarding}
            />
            <DeleteModal
                isVisible={agentUpload.delete}
                close={() => {
                    setAgentUpload({ ...agentUpload, replace: false, delete: false, images: [] });
                }}
                submit={dismissHoarding}
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
                                    <AgentViewWithCarousel index={index} el={el} locationHandler={locationHandler} setAgentUpload={setAgentUpload} />
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AgentMain;
