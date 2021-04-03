import { clientSideBackend } from "Client/clientsideBackend";
import Navbar from "components/Navbar";
import React, { useCallback, useEffect, useState } from "react";

const ClientMain = ({ uid }) => {
    const [state, setState] = useState({
        client: {
            hid: [],
            shid: [],
        },
        stopLoading: false,
    });

    const getClient = useCallback(async () => {
        try {
            const res = await clientSideBackend.getClient();
            setState({ ...state, stopLoading: true, client: res.client });
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
            <div className="jumbotron">
                {state.stopLoading && (
                    <div class="container">
                        {state.client.hid.length > 0 && (
                            <div className="row">
                                <div className="col-sm-12 my-4 fnt-mt-b">
                                    <h1>Your Hoardings</h1>
                                </div>
                            </div>
                        )}
                        <div className="row">
                            {state.client.hid.length > 0 &&
                                state.client.hid.map((el, index) => (
                                    <div class="col-sm-12 col-md-4">
                                        <div class="mb-3 card border-light rounded  ">
                                            <div className="card-header bg-light border-light">
                                                <div className="fnt-mt-b">
                                                    #{el.hcode} ({el.size})
                                                </div>
                                                <div className="fnt-mt-l">{el.location}</div>
                                            </div>
                                            <div className="card-body p-1">
                                                <img
                                                    src={`${process.env.REACT_APP_API_URL}/${el.imageUrl}`}
                                                    class="img-fluid"
                                                    alt="Hoarding "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        {state.client.shid.length > 0 && (
                            <div className="row">
                                <div className="col-sm-12 my-4 fnt-mt-b">
                                    <h1>Highly Recommended</h1>
                                </div>
                            </div>
                        )}
                        <div className="row">
                            {state.client.shid.length > 0 &&
                                state.client.shid.map((el, index) => (
                                    <div class="col-sm-12 col-md-5">
                                        <div class="mb-3 card border-light rounded  ">
                                            <div className="card-header bg-light border-light">
                                                <div className="fnt-mt-b">
                                                    #{el.hcode} ({el.size})
                                                </div>
                                                <div className="fnt-mt-l">{el.location}</div>
                                            </div>
                                            <div className="card-body p-1">
                                                <img
                                                    src={`${process.env.REACT_APP_API_URL}/${el.imageUrl}`}
                                                    class="img-fluid"
                                                    alt="Hoarding "
                                                />
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

export default ClientMain;
