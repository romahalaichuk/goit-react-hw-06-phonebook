import React, { useState, useEffect, useRef } from "react";
import "./Table.css";

const Table = ({ id, name, status, onTableClick }) => {
	const handleClick = () => {
		onTableClick(id);
	};

	return (
		<div
			className={`table ${
				status === "occupied" ? "table-occupied" : "table-free"
			} ${status === "special" ? "table-special" : ""}`}
			onClick={handleClick}>
			<span className="table-name">{name}</span>
		</div>
	);
};

export default Table;
