import React, { useCallback, useEffect, useState } from "react";
import Navbar from "components/Navbar";
import { Edit, Plus, Trash } from "react-feather";
import ClientModal from "components/Modal/ClientModal";
import { clientBackend } from "Admin/clientBackend";
import DeleteModal from "components/Modal/DeleteModal";
import ViewAssigned from "components/Modal/ViewAssigned";

const Main = ({ uid }) => {
    const [state, setState] = useState({
        clients: [],
        stopLoading: false,
        cid: "",
        search: "",
        copyOfClients: [],
    });

    const initClient = {
        cid: "",
        email: "",
        phone: "",
        password: "",
        cname: "",
        pname: "",
        hid: [],
        hcode: "",
        add: false,
        assign: false,
        delete: false,
        gst: "",
        status: "",
        edit: false,
    };

    const [client, setClient] = useState({ ...initClient });

    const getClients = useCallback(async () => {
        try {
            const res = await clientBackend.getAllClients();
            setState({ clients: [...res.clients], stopLoading: true, copyOfClients: [...res.clients] });
        } catch (error) {
            if (error.response && error.response.data.message === "Unauthorized.") {
                window.localStorage.removeItem("uid");
                window.localStorage.removeItem("token");
            }
        }
    }, []);

    useEffect(() => {
        getClients();
        return () => {};
    }, [getClients]);

    const AddClient = async () => {
        if (!client.phone || !client.password || !client.cname || !client.pname) {
            return setClient({ ...client, status: "Fields can't be empty!" });
        }
        try {
            const res = await clientBackend.addClient({
                phone: client.phone,
                password: client.password,
                cname: client.cname,
                pname: client.pname,
                email: client.email,
                gst: client.gst,
                uid: uid,
            });
            setState({
                ...state,
                clients: [...state.clients, res.client],
            });
            setClient({ ...initClient });
        } catch (error) {
            console.log(error);
        }
    };

    const updateClient = async () => {
        if (!client.cname || !client.pname) {
            return setClient({ ...client, status: "Fields can't be empty!" });
        }
        try {
            const res = await clientBackend.updateClient({
                cid: client.cid,
                password: client.password,
                cname: client.cname,
                pname: client.pname,
                email: client.email,
                gst: client.gst,
            });
            let temp = [...state.clients];
            const indx = temp.findIndex((el) => el._id === state.cid);
            temp.splice(indx, 1);
            temp.splice(indx, 0, { ...res.client, hid: [] });
            setState({
                ...state,
                clients: temp,
            });
            setClient({ ...initClient });
        } catch (error) {
            console.log(error);
            if (error.response)
                setClient({
                    ...initClient,
                    status: error.response.data.message,
                });
        }
    };

    const deleteClient = async () => {
        try {
            await clientBackend.deleteClient({ cid: client.cid });
            const indx = state.clients.findIndex((el) => el._id === client.cid);
            const temp = [...state.clients];
            temp.splice(indx, 1);
            setState({ clients: temp, stopLoading: true });
            setClient({ ...initClient });
        } catch (error) {
            console.log(error);
        }
    };

    const closeModal = () => {
        setClient({ ...initClient });
    };

    return (
        <>
            <Navbar />
            <ClientModal
                title={client.title}
                isVisible={client.add}
                state={client}
                setState={setClient}
                close={closeModal}
                submit={client.edit ? updateClient : AddClient}
            />
            <ViewAssigned isVisible={client.assign} state={client.hid} close={closeModal} />
            <DeleteModal submit={deleteClient} close={closeModal} isVisible={client.delete} />
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
                                    const temp = state.clients.filter((el) => el.cname.match(evt.target.value) || el.phone.match(evt.target.value));
                                    setState({ ...state, clients: [...temp] });
                                } else {
                                    setState({ ...state, clients: [...state.copyOfClients] });
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="row px-3 d-flex">
                    <h1>Clients</h1>
                    <button
                        className="btn btn-outline-primary ml-auto mb-2"
                        onClick={() => {
                            setClient({ ...client, add: true, title: "Add Client" });
                        }}
                    >
                        <Plus size="12" /> Add
                    </button>
                </div>
                <div className="row overflow-auto px-3">
                    <table className="table table-hover border">
                        <thead>
                            <th scope="col">Sr.</th>
                            <th scope="col">Company</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Password</th>
                            <th scope="col">Email</th>
                            <th scope="col">GST</th>
                            <th scope="col">Hoarding</th>
                            <th scope="col">Action</th>
                        </thead>
                        {state.stopLoading && (
                            <tbody>
                                {state.clients.map((elem, index) => (
                                    <tr key={index} class="table-light">
                                        <th scope="row">{index + 1}</th>
                                        <td>{elem.cname}</td>
                                        <td>{elem.pname}</td>
                                        <td>{elem.phone}</td>
                                        <td>{elem.password}</td>
                                        <td>{elem.email ? elem.email : "No email"}</td>
                                        <td>{elem.gst ? elem.gst : "No gst"}</td>
                                        <td>
                                            {elem.hid.length > 0 ? (
                                                <span
                                                    className="hyperlink"
                                                    onClick={() => {
                                                        setClient({ ...client, assign: true, hid: elem.hid });
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
                                                className="btn btn-sm btn-warning"
                                                style={{ borderRadius: 10 }}
                                                onClick={() => {
                                                    setClient({
                                                        email: elem.email,
                                                        phone: elem.phone,
                                                        cname: elem.cname,
                                                        pname: elem.pname,
                                                        add: true,
                                                        gst: elem.gst,
                                                        cid: elem._id,
                                                        status: false,
                                                        edit: true,
                                                        title: "Edit Client",
                                                    });
                                                }}
                                            >
                                                <Edit size="12" />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger ml-2"
                                                style={{ borderRadius: 10 }}
                                                onClick={() => {
                                                    setClient({
                                                        ...client,
                                                        cid: elem._id,
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

export default Main;
