import React, { useCallback, useEffect, useState } from "react";
import { Plus, Trash } from "react-feather";
import Navbar from "components/Navbar";
import HoardingModal from "components/Modal/HoardingModal";
import { hoardingBackend } from "Admin/hoardingBackend";
import ImagePreview from "components/Modal/ImagePreview";
import AssignModal from "components/Modal/AssignModal";
import AssignAgent from "components/Modal/AssignAgent";
import DisassignModal from "components/Modal/DisassignModal";
import DeleteModal from "components/Modal/DeleteModal";
const Hoarding = (props) => {
    const blankHoaring = {
        size: "",
        aid: window.localStorage.getItem("uid"),
        description: "",
        location: "",
        assigned: "",
        imageUrl: "",
        index: "",
        hid: "",
        hcode: "",
        image: null,
        delete: false,
        edit: false,
        view: false,
        add: false,
        reset: false,
        title: "",
    };

    const blankAssign = {
        cid: "",
        hid: "",
        sid: "",
        view: false,
        delete: false,
        index: "",
        deleteSuggestion: false,
        viewSuggestion: false,
        viewAgent: false,
        deleteAgent: false,
    };

    const [hoarding, setHoarding] = useState({ ...blankHoaring });
    const [state, setState] = useState({ hoardings: [], stopLoading: false, search: "" });
    const [assign, setAssign] = useState({ ...blankAssign });
    const close = () => {
        setHoarding({ ...blankHoaring });
        setAssign({ ...blankAssign });
    };

    const getALL = useCallback(async () => {
        try {
            const res = await hoardingBackend.getAllHoardings();
            const clients = await hoardingBackend.getClientsList();
            const agents = await hoardingBackend.getAgentsList();
            setState({
                hoardings: [...res.data],
                copy: [...res.data],
                clients: [...clients.data],
                agents: [...agents.data],
                stopLoading: true,
            });
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.message === "Unauthorized.") {
                window.localStorage.removeItem("uid");
                window.localStorage.removeItem("token");
                window.location.reload();
            }
        }
    }, []);

    useEffect(() => {
        getALL();
        return () => {};
    }, [getALL]);

    const addHoarding = async () => {
        console.log("here");
        try {
            const formData = new FormData();
            formData.append("image", hoarding.image);
            formData.set("size", hoarding.size);
            formData.set("location", hoarding.location);
            formData.set("description", hoarding.description);
            formData.set("hcode", hoarding.hcode);
            formData.set("aid", hoarding.aid);
            const res = await hoardingBackend.addHoarding(formData);
            setState({ ...state, hoardings: [...state.hoardings, { ...res.data }] });
            close();
        } catch (error) {
            console.log(error);
        }
    };

    const assignClient = async () => {
        if (!assign.cid || !assign.hid) {
            return setAssign({ ...assign, status: "Select Client before Assign!" });
        }
        try {
            const formData = new FormData();
            formData.set("cid", assign.cid);
            formData.set("hid", assign.hid);
            const res = await hoardingBackend.assignClient(formData);
            const temp = [...state.hoardings];
            temp[assign.index].cid = res.data.cid;
            setState({ ...state, hoardings: [...temp] });
            close();
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data)
                return setAssign({ ...assign, status: error.response.data.message });
        }
    };

    const assignSuggestionClient = async () => {
        if (!assign.cid || !assign.hid) {
            return setAssign({ ...assign, status: "Select Client before Assign!" });
        }
        try {
            const formData = new FormData();
            formData.set("cid", assign.cid);
            formData.set("hid", assign.hid);
            const res = await hoardingBackend.suggestClient(formData);
            const temp = [...state.hoardings];
            temp[assign.index].scid = res.data.scid;
            setState({ ...state, hoardings: [...temp] });
            close();
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data)
                return setAssign({ ...assign, status: error.response.data.message });
        }
    };

    const assignAgent = async () => {
        console.log(assign);
        if (!assign.sid || !assign.hid) {
            return setAssign({ ...assign, status: "Select Agent before Assign!" });
        }
        try {
            const formData = new FormData();
            formData.set("sid", assign.sid);
            formData.set("hid", assign.hid);
            const res = await hoardingBackend.assignAgent(formData);
            const temp = [...state.hoardings];
            temp[assign.index].sid = res.data.sid;
            setState({ ...state, hoardings: [...temp] });
            close();
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data)
                return setAssign({ ...assign, status: error.response.data.message });
        }
    };

    const retainAgent = async () => {
        try {
            const formData = new FormData();
            formData.set("sid", assign.sid);
            formData.set("hid", assign.hid);
            await hoardingBackend.retainAgent(formData);
            const temp = [...state.hoardings];
            temp[assign.index].sid = null;
            setState({ ...state, hoardings: [...temp] });
            close();
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data)
                return setAssign({ ...assign, status: error.response.data.message });
        }
    };

    const retainHoarding = async () => {
        try {
            const formData = new FormData();
            formData.set("cid", assign.cid);
            formData.set("hid", assign.hid);
            await hoardingBackend.retainClient(formData);
            const temp = [...state.hoardings];
            temp[assign.index].cid = null;
            setState({ ...state, hoardings: [...temp] });
            close();
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data)
                return setAssign({ ...assign, status: error.response.data.message });
        }
    };

    const retainSuggestedHoarding = async () => {
        try {
            const formData = new FormData();
            formData.set("cid", assign.cid);
            formData.set("hid", assign.hid);
            await hoardingBackend.retainSuggestionClient(formData);
            const temp = [...state.hoardings];
            temp[assign.index].scid = null;
            setState({ ...state, hoardings: [...temp] });
            close();
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data)
                return setAssign({ ...assign, status: error.response.data.message });
        }
    };

    const editHoarding = async () => {
        try {
            const formData = new FormData();
            formData.set("hid", hoarding.hid);
            formData.set("size", hoarding.size);
            formData.set("description", hoarding.description);
            formData.set("location", hoarding.location);
            formData.set("hcode", hoarding.hcode);
            const res = await hoardingBackend.editHoarding(formData);
            if (res.message) {
                let temp = [...state.hoardings];
                temp[hoarding.index].size = hoarding.size;
                temp[hoarding.index].description = hoarding.description;
                temp[hoarding.index].location = hoarding.location;
                setState({ ...state, hoardings: [...temp] });
                close();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteHoarding = async () => {
        try {
            const formData = new FormData();
            formData.set("hid", hoarding.hid);
            const res = await hoardingBackend.deleteHoardings(formData);
            if (res.message) {
                let temp = [...state.hoardings];
                temp.splice(hoarding.index, 0);
                setState({ ...state, hoardings: [...temp] });
                close();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const resetHoarding = async () => {
        if (!hoarding.image) {
            setHoarding({ ...hoarding, status: "Please Select Image" });
        }
        try {
            const formData = new FormData();
            formData.set("hid", hoarding.hid);
            formData.append("image", hoarding.image);
            const res = await hoardingBackend.resetImage(formData);
            if (res.message) {
                let temp = [...state.hoardings];
                temp[hoarding.index].imageUrl = res.url;
                setState({ ...state, hoardings: [...temp] });
                close();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            {state.stopLoading && (
                <>
                    <HoardingModal
                        title={hoarding.title}
                        isVisible={hoarding.add}
                        state={hoarding}
                        setState={setHoarding}
                        close={close}
                        submit={addHoarding}
                    />
                    <HoardingModal
                        title={hoarding.title}
                        isVisible={hoarding.edit}
                        state={hoarding}
                        setState={setHoarding}
                        close={close}
                        submit={editHoarding}
                    />
                    <HoardingModal
                        title={hoarding.title}
                        isVisible={hoarding.reset}
                        state={hoarding}
                        setState={setHoarding}
                        close={close}
                        submit={resetHoarding}
                    />
                    <ImagePreview isVisible={hoarding.view} url={hoarding.imageUrl} close={close} />
                    <AssignModal
                        isVisible={assign.view}
                        close={close}
                        state={assign}
                        setState={setAssign}
                        clients={state.clients}
                        submit={assignClient}
                    />
                    <DisassignModal isVisible={assign.delete} close={close} submit={retainHoarding} />
                    <AssignModal
                        isVisible={assign.viewSuggestion}
                        close={close}
                        state={assign}
                        setState={setAssign}
                        clients={state.clients}
                        submit={assignSuggestionClient}
                    />
                    <DisassignModal
                        isVisible={assign.deleteSuggestion}
                        close={close}
                        submit={retainSuggestedHoarding}
                    />
                    <AssignAgent
                        isVisible={assign.viewAgent}
                        close={close}
                        state={assign}
                        setState={setAssign}
                        clients={state.agents}
                        submit={assignAgent}
                    />
                    <DisassignModal isVisible={assign.deleteAgent} close={close} submit={retainAgent} />
                    <DeleteModal isVisible={hoarding.delete} close={close} submit={deleteHoarding} />
                </>
            )}
            <div className="jumbotron">
                <div className="row px-3 d-flex">
                    <div class="form-group ml-auto">
                        <label for="exampleInputEmail1 ">Search</label>
                        <input
                            type="email"
                            class="form-control border border-primary"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Location"
                            rel="noreferrer"
                            value={state.search}
                            onChange={(evt) => {
                                setState({ ...state, search: evt.target.value });
                                if (evt.target.value !== "") {
                                    const temp = state.hoardings.filter((el) => el.location.match(evt.target.value));
                                    setState({ ...state, hoardings: [...temp] });
                                } else {
                                    setState({ ...state, hoardings: [...state.copy] });
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="row px-3 d-flex">
                    <h1>Hoardings</h1>
                    <button
                        className="btn btn-outline-primary ml-auto mb-2"
                        onClick={() => {
                            setHoarding({ ...hoarding, add: true, title: "Add Hoarding" });
                        }}
                    >
                        <Plus size="12" /> Add
                    </button>
                </div>
                <div className="row overflow-auto px-3">
                    <table className="table table-hover border ">
                        <thead>
                            <tr>
                                <th scope="col">Sr.</th>
                                <th scope="col">Size</th>
                                <th scope="col">Description</th>
                                <th scope="col">Location</th>
                                <th scope="col">Current View</th>
                                <th scope="col">Assigned</th>
                                <th scope="col">Suggested</th>
                                <th scope="col">Agent</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {state.stopLoading && (
                            <tbody>
                                {state.hoardings.map((elem, index) => (
                                    <tr class="table-light">
                                        <td>{elem.hcode}</td>
                                        <td>{elem.size}</td>
                                        <td>{elem.description}</td>
                                        <td>{elem.location}</td>
                                        <td>
                                            <span
                                                className=" mr-3 hyperlink"
                                                onClick={() => {
                                                    setHoarding({
                                                        ...hoarding,
                                                        imageUrl: `${process.env.REACT_APP_API_URL}/api/${elem.imageUrl}`,
                                                        view: true,
                                                    });
                                                }}
                                            >
                                                Open
                                            </span>{" "}
                                            <a
                                                className="text-info"
                                                href={`${process.env.REACT_APP_API_URL}/api/${elem.imageUrl}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Preview
                                            </a>
                                        </td>

                                        <td>
                                            {elem.cid ? (
                                                <span
                                                    className="hyperlink"
                                                    onClick={() => {
                                                        setAssign({
                                                            ...assign,
                                                            cid: elem.cid._id,
                                                            hid: elem._id,
                                                            index: index,
                                                            delete: true,
                                                        });
                                                    }}
                                                >
                                                    {elem.cid.cname}
                                                </span>
                                            ) : (
                                                <button
                                                    className="btn btn-sm btn-info"
                                                    style={{ borderRadius: 10 }}
                                                    onClick={() =>
                                                        setAssign({
                                                            ...assign,
                                                            hid: elem._id,
                                                            index: index,
                                                            view: true,
                                                        })
                                                    }
                                                >
                                                    Assign
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            {elem.scid ? (
                                                <span
                                                    className=" hyperlink"
                                                    onClick={() => {
                                                        setAssign({
                                                            ...assign,
                                                            cid: elem.scid._id,
                                                            hid: elem._id,
                                                            index: index,
                                                            deleteSuggestion: true,
                                                        });
                                                    }}
                                                >
                                                    {elem.scid.cname}
                                                </span>
                                            ) : (
                                                <button
                                                    className="btn btn-sm btn-info"
                                                    style={{ borderRadius: 10 }}
                                                    onClick={() =>
                                                        setAssign({
                                                            ...assign,
                                                            hid: elem._id,
                                                            index: index,
                                                            viewSuggestion: true,
                                                        })
                                                    }
                                                >
                                                    Suggest
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            {elem.sid ? (
                                                <span
                                                    className=" hyperlink"
                                                    onClick={() => {
                                                        setAssign({
                                                            ...assign,
                                                            sid: elem.sid._id,
                                                            hid: elem._id,
                                                            index: index,
                                                            deleteAgent: true,
                                                        });
                                                    }}
                                                >
                                                    {elem.sid.name}
                                                </span>
                                            ) : (
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    style={{ borderRadius: 10 }}
                                                    onClick={() =>
                                                        setAssign({
                                                            ...assign,
                                                            hid: elem._id,
                                                            index: index,
                                                            viewAgent: true,
                                                        })
                                                    }
                                                >
                                                    Assign
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-info"
                                                style={{ borderRadius: 10 }}
                                                onClick={() => {
                                                    setHoarding({
                                                        ...hoarding,
                                                        hid: elem._id,
                                                        hcode: elem.hcode,
                                                        size: elem.size,
                                                        location: elem.location,
                                                        description: elem.description,
                                                        index: index,
                                                        edit: true,
                                                    });
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-primary ml-2"
                                                style={{ borderRadius: 10 }}
                                                onClick={() => {
                                                    setHoarding({
                                                        ...hoarding,
                                                        hid: elem._id,
                                                        index: index,
                                                        title: "Reset Image",
                                                        reset: true,
                                                    });
                                                }}
                                            >
                                                Reset Image
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger  ml-2"
                                                style={{ borderRadius: 10 }}
                                                onClick={() => {
                                                    setHoarding({
                                                        ...hoarding,
                                                        hid: elem._id,
                                                        index: index,
                                                        delete: true,
                                                    });
                                                }}
                                            >
                                                <Trash size="12" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </>
    );
};

export default Hoarding;
