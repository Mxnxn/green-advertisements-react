import React from "react";
import { Route } from "react-router-dom";
import Login from "./Login";
export const ProtectiveRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (
                    window.localStorage.getItem("uid") &&
                    window.localStorage.getItem("token") &&
                    window.localStorage.getItem("mode") === "ADMIN"
                ) {
                    return (
                        <Component
                            // email={window.localStorage.getItem("email")}
                            uid={window.localStorage.getItem("uid")}
                            {...props}
                        />
                    );
                } else {
                    return <Login />;
                }
            }}
        />
    );
};
