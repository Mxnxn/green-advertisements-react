import React from "react";
import "./assets/style.scss";
import "./assets/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { ProtectiveRoute } from "./Authentication/components/ProtectiveRoute";
import { ProtectiveClientRoute } from "./Authentication/components/ProtectiveClientRoute";
import Hoarding from "./Admin/components/Hoarding";
import ClientMain from "./Client/components/ClientMain";
import Main from "Admin/components/Main";
import { ProtectiveAgentRoute } from "Authentication/components/ProtectiveAgentRoute";
import Agent from "Admin/components/Agent";
import AgentMain from "Agent/components/AgentMain";

const App = (props) => {
    return (
        <BrowserRouter basename="/erp">
            <div className="App ">
                <div className="container-fluid px-0 overflow-hidden">
                    <ProtectiveRoute exact path="/admin/" component={Main} />
                    <ProtectiveRoute exact path="/admin/hoarding" component={Hoarding} />
                    <ProtectiveRoute exact path="/admin/agents" component={Agent} />
                    <ProtectiveClientRoute exact path="/" component={ClientMain} />
                    <ProtectiveAgentRoute exact path="/agents/" component={AgentMain} />
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
