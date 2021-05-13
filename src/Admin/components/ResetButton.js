import React from "react";
import { RefreshCw } from "react-feather";

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
			<RefreshCw size={12} />
		</button>
	);
};

export default ResetButton;
