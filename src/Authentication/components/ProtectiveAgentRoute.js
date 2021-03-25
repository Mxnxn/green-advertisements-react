import React from "react";
import { Route } from "react-router-dom";
import AgentLogin from "./AgentLogin";
export const ProtectiveAgentRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (
                    window.localStorage.getItem("uid") &&
                    window.localStorage.getItem("token") &&
                    window.localStorage.getItem("mode") === "AGENT"
                ) {
                    return (
                        <Component
                            // email={window.localStorage.getItem("email")}
                            cid={window.localStorage.getItem("uid")}
                            {...props}
                        />
                    );
                } else {
                    return <AgentLogin />;
                }
            }}
        />
    );
};
