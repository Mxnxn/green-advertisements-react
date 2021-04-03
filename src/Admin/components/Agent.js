import { agentBackend } from "Admin/agentBackend";
import AgentModal from "components/Modal/AgentModal";
import DeleteModal from "components/Modal/DeleteModal";
import ViewAssigned from "components/Modal/ViewAssigned";
import Navbar from "components/Navbar";
import React, { useCallback, useEffect, useState } from "react";
import { Plus, Trash } from "react-feather";

const Agent = ({ uid }) => {
    const [state, setState] = useState({
        agents: [],
        stopLoading: false,
        sid: "",
        search: "",
        copy: [],
    });

    const initAgent = {
        sid: "",
        phone: "",
        password: "",
        name: "",
        index: "",
        hid: [],
        add: false,
        assign: false,
        delete: false,
        status: "",
        edit: false,
    };

    const [agent, setAgent] = useState({ ...initAgent });

    const getAgents = useCallback(async () => {
        try {
            const res = await agentBackend.getAllAgents();
            console.log(res);
            setState({ agents: [...res.agents], stopLoading: true, copy: [...res.agents] });
        } catch (error) {
            if (error.response && error.response.data.message === "Unauthorized.") {
                window.localStorage.removeItem("uid");
                window.localStorage.removeItem("token");
            }
        }
    }, []);

    useEffect(() => {
        getAgents();
        return () => {};
    }, [getAgents]);

    const closeModal = () => {
        setAgent({ ...initAgent });
    };

    const addAgent = async () => {
        if (!agent.phone || !agent.password || !agent.name) {
            return setAgent({ ...agent, status: "Fields can't be empty!" });
        }
        try {
            const res = await agentBackend.addAgent({
                phone: agent.phone,
                password: agent.password,
                name: agent.name,
                uid: uid,
            });
            setState({
                ...state,
                agents: [...state.agents, { ...res.agent }],
            });
            setAgent({ ...initAgent });
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAgent = async () => {
        try {
            const res = await agentBackend.deleteAgent({
                sid: agent.sid,
            });
            if (res.message) {
                let temp = [...state.agents];
                temp.splice(agent.index, 1);
                setState({ ...state, agents: temp });
                setAgent({ ...initAgent });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <AgentModal
                title={agent.title}
                isVisible={agent.add}
                state={agent}
                setState={setAgent}
                close={closeModal}
                submit={addAgent}
            />
            <ViewAssigned isVisible={agent.assign} state={agent.hid} close={closeModal} />
            <DeleteModal submit={deleteAgent} close={closeModal} isVisible={agent.delete} />
            <div className="jumbotron">
                <div className="row px-3 d-flex">
                    <div class="form-group ml-auto">
                        <label for="exampleInputEmail1 ">Search</label>
                        <input
                            type="text"
                            class="form-control border border-primary"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Phone/Name"
                            value={state.search}
                            onChange={(evt) => {
                                setState({ ...state, search: evt.target.value });
                                if (evt.target.value !== "") {
                                    const temp = state.agents.filter(
                                        (el) => el.name.match(evt.target.value) || el.phone.match(evt.target.value)
                                    );
                                    setState({ ...state, agents: [...temp] });
                                } else {
                                    setState({ ...state, agents: [...state.copy] });
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="row px-3 d-flex">
                    <h1>Agents</h1>
                    <button
                        className="btn btn-outline-primary ml-auto mb-2"
                        onClick={() => {
                            setAgent({ ...agent, add: true, title: "Add Agent" });
                        }}
                    >
                        <Plus size="12" /> Add
                    </button>
                </div>
                <div className="row overflow-auto px-3">
                    <table className="table table-hover border">
                        <thead>
                            <th scope="col">Sr.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">View</th>
                            <th scope="col">Action</th>
                        </thead>

                        {state.stopLoading && (
                            <tbody>
                                {state.agents.map((elem, index) => (
                                    <tr key={index} class="table-light">
                                        <td>{index + 1}</td>
                                        <td>{elem.name}</td>
                                        <td>{elem.phone}</td>
                                        <td>
                                            {elem.hid.length > 0 ? (
                                                <span
                                                    className="hyperlink"
                                                    onClick={() => {
                                                        setAgent({ ...agent, assign: true, hid: elem.hid });
                                                    }}
                                                >
                                                    View
                                                </span>
                                            ) : (
                                                "Not Assigned"
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-danger ml-2"
                                                style={{ borderRadius: 10 }}
                                                onClick={() => {
                                                    setAgent({
                                                        ...agent,
                                                        sid: elem._id,
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

export default Agent;
