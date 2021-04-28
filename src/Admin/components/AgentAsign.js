import React from "react";

const AgentAssign = ({ elem, setAssign, index }) => {
    return elem.sid ? (
        <span
            className=" hyperlink"
            onClick={() => {
                setAssign((prev) => ({
                    ...prev,
                    sid: elem.sid._id,
                    hid: elem._id,
                    index: index,
                    deleteAgent: true,
                }));
            }}
        >
            {elem.sid.name}
        </span>
    ) : (
        <button
            className="btn btn-sm btn-primary"
            style={{ borderRadius: 10 }}
            onClick={() =>
                setAssign((prev) => ({
                    ...prev,
                    hid: elem._id,
                    index: index,
                    viewAgent: true,
                }))
            }
        >
            Assign
        </button>
    );
};

export default AgentAssign;
