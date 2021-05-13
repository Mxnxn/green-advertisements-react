import React from "react";
import { Route } from "react-router-dom";
import ClientLogin from "./ClientLogin";
export const ProtectiveClientRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (
					window.localStorage.getItem("uid") &&
					window.localStorage.getItem("token") &&
					window.localStorage.getItem("mode") === "CLIENT"
				) {
					return <Component cid={window.localStorage.getItem("uid")} {...props} />;
				} else {
					return <ClientLogin />;
				}
			}}
		/>
	);
};
