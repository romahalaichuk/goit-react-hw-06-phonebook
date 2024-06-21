import React from "react";
import Table from "./Table";

const WynosListModal = ({ tables, onClose, onTableClick }) => {
	return (
		<div className="modal-overlay">
			<div className="modal">
				<h2>Wybierz stolik</h2>
				<div className="table-grid">
					{tables.map((table) => (
						<Table
							key={table.id}
							id={table.id}
							name={table.name}
							status={table.status}
							products={table.products}
							onTableClick={onTableClick}
						/>
					))}
				</div>
				<button onClick={onClose}>Zamknij</button>
			</div>
		</div>
	);
};

export default WynosListModal;
