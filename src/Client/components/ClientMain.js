import { clientSideBackend } from "Client/clientsideBackend";
import ImageCardWithCarousel from "components/ImageCardWithCarousel";
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
                                state.client.hid.map((el, index) => <ImageCardWithCarousel el={el} locationHandler={locationHandler} />)}
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
                                state.client.shid.map((el, index) => <ImageCardWithCarousel el={el} locationHandler={locationHandler} />)}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ClientMain;
