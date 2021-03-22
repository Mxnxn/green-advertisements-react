import React, { useCallback, useEffect, useState } from "react";
import Navbar from "components/Navbar";
import { Edit, Plus, Trash } from "react-feather";
import ClientModal from "components/Modal/ClientModal";
import { clientBackend } from "Admin/clientBackend";
import DeleteModal from "components/Modal/DeleteModal";

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
        name: "",
        add: false,
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
        if (!client.phone || !client.password || !client.name) {
            return setClient({ ...client, status: "Fields can't be empty!" });
        }
        try {
            const res = await clientBackend.addClient({
                phone: client.phone,
                password: client.password,
                name: client.name,
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
        if (!client.name) {
            return setClient({ ...client, status: "Fields can't be empty!" });
        }
        try {
            const res = await clientBackend.updateClient({
                cid: client.cid,
                password: client.password,
                name: client.name,
                email: client.email,
                gst: client.gst,
            });

            let temp = [...state.clients];
            const indx = temp.findIndex((el) => el._id === state.cid);
            temp.splice(indx, 1);
            temp.splice(indx, 0, res.client);
            setState({
                ...state,
                clients: temp,
            });
            setClient({ ...initClient });
        } catch (error) {
            console.log(error);
            setClient({
                email: "",
                phone: "",
                status: error.response.data.message,
                gst: "",
                password: "",
                name: "",
                add: false,
                edit: false,
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
                                    const temp = state.clients.filter(
                                        (el) => el.name.match(evt.target.value) || el.phone.match(evt.target.value)
                                    );
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
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
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
                                        <td>{elem.name}</td>
                                        <td>{elem.phone}</td>
                                        <td>{elem.email ? elem.email : "No email"}</td>
                                        <td>{elem.gst ? elem.gst : "No gst"}</td>
                                        <td>{elem.hid ? elem.hid.location : "Not Assigned"}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-warning"
                                                style={{ borderRadius: 10 }}
                                                onClick={() => {
                                                    setClient({
                                                        email: elem.email,
                                                        phone: elem.phone,
                                                        name: elem.name,
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
