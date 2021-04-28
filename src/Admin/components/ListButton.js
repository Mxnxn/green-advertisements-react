import React from "react";

const ListButton = ({ elem, setAssign, index }) => {
    return (
        elem.scid.length > 0 && (
            <button
                className="btn btn-sm btn-primary mr-2"
                style={{ borderRadius: 10 }}
                onClick={() =>
                    setAssign((prev) => ({
                        ...prev,
                        hid: elem._id,
                        sid: elem.scid,
                        index: index,
                        viewAssignedSuggestion: true,
                    }))
                }
            >
                List
            </button>
        )
    );
};

export default ListButton;
