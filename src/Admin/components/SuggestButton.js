import React from "react";

const SuggestButton = ({ elem, setAssign, index }) => {
    return (
        <button
            className="btn btn-sm btn-info"
            style={{ borderRadius: 10 }}
            onClick={() =>
                setAssign((prev) => ({
                    ...prev,
                    hid: elem._id,
                    index: index,
                    viewSuggestion: true,
                }))
            }
        >
            Suggest
        </button>
    );
};

export default SuggestButton;
