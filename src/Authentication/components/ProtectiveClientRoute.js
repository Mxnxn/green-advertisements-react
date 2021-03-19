import React from "react";
import { Route } from "react-router-dom";
import ClientLogin from "./ClientLogin";
export const ProtectiveClientRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (window.localStorage.getItem("cid") && window.localStorage.getItem("ctoken")) {
                    return (
                        <Component
                            // email={window.localStorage.getItem("email")}
                            cid={window.localStorage.getItem("cid")}
                            {...props}
                        />
                    );
                } else {
                    return <ClientLogin />;
                }
            }}
        />
    );
};
