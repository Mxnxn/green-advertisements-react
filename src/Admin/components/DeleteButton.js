import React from "react";
import { Trash } from "react-feather";

const DeleteButton = ({ elem, setHoarding, index }) => {
    return (
        <button
            className="btn btn-sm btn-danger  ml-2"
            style={{ borderRadius: 10 }}
            onClick={() => {
                setHoarding((hoarding) => ({
                    ...hoarding,
                    hid: elem._id,
                    index: index,
                    delete: true,
                }));
            }}
        >
            <Trash size="12" />
        </button>
    );
};

export default DeleteButton;
