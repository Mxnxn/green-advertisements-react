import React from "react";

const ResetButton = ({ elem, setHoarding, index }) => {
    return (
        <button
            className="btn btn-sm btn-primary ml-2"
            style={{ borderRadius: 10 }}
            onClick={() => {
                setHoarding((hoarding) => ({
                    ...hoarding,
                    hid: elem._id,
                    index: index,
                    title: "Reset Image",
                    reset: true,
                }));
            }}
        >
            Reset Image
        </button>
    );
};

export default ResetButton;
