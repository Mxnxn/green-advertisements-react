import React from "react";
import "./assets/style.scss";
import "./assets/bootstrap.min.css";
import Main from "./Client/components/Main";
import { BrowserRouter } from "react-router-dom";
import { ProtectiveRoute } from "./Authentication/components/ProtectiveRoute";
import { ProtectiveClientRoute } from "./Authentication/components/ProtectiveClientRoute";
import Hoarding from "./Client/components/Hoarding";
const ClientSide = () => {
    return (
        <button
            onClick={() => {
                window.localStorage.removeItem("cid");
                window.localStorage.removeItem("ctoken");
                window.location.reload();
            }}
        >
            Logout
        </button>
    );
};

const App = (props) => {
    return (
        <BrowserRouter basename="/">
            <div className="App ">
                <div className="container-fluid px-0 overflow-hidden">
                    <ProtectiveRoute exact path="/admin/" component={Main} />
                    <ProtectiveRoute exact path="/admin/hoarding" component={Hoarding} />
                    <ProtectiveClientRoute exact path="/" component={ClientSide} />
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
