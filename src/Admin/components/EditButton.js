import React from "react";
import { Edit2 } from "react-feather";

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
                    hsn: elem.hsn,
                    rate: elem.rate,
                    location: elem.location,
                    description: elem.description,
                    index: index,
                    edit: true,
                }));
            }}
        >
            <Edit2 size={12} />
        </button>
    );
};

export default EditButton;
