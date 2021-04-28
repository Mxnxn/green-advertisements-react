import React from "react";

const EditButton = ({ elem, index, setHoarding }) => {
    return (
        <button
            className="btn btn-sm btn-info"
            style={{ borderRadius: 10 }}
            onClick={() => {
                setHoarding((prev) => ({
                    ...prev,
                    hid: elem._id,
                    hcode: elem.hcode,
                    size: elem.size,
                    location: elem.location,
                    description: elem.description,
                    index: index,
                    edit: true,
                }));
            }}
        >
            Edit
        </button>
    );
};

export default EditButton;
