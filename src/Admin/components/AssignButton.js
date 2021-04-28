import React from "react";

const AssignButton = ({ elem, setAssign, index }) => {
    return elem.cid ? (
        <span
            className="hyperlink"
            onClick={() => {
                setAssign((prev) => ({
                    ...prev,
                    cid: elem.cid._id,
                    hid: elem._id,
                    index: index,
                    delete: true,
                }));
            }}
        >
            {elem.cid.cname}
        </span>
    ) : (
        <button
            className="btn btn-sm btn-info"
            style={{ borderRadius: 10 }}
            onClick={() =>
                setAssign((prev) => ({
                    ...prev,
                    hid: elem._id,
                    index: index,
                    view: true,
                }))
            }
        >
            Assign
        </button>
    );
};

export default AssignButton;
