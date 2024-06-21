import React from "react";
import "./ManagerPanel.css";
import {
	calculateTotalTablesDuringDay,
	calculateTotalWynos,
	calculateTotalAmount,
} from "./ManagerPanelFunctions";

const ManagerPanel = ({ tables = [], wynosTables = [] }) => {
	const totalTablesDuringDay = calculateTotalTablesDuringDay(tables);
	const totalWynos = calculateTotalWynos(wynosTables);
	const totalAmount = calculateTotalAmount(tables, wynosTables);

	return (
		<div className="manager-panel">
			<h2>Panel Managera</h2>
			<div className="manager-info">
				<div className="info-item">
					<strong>Łączna liczba stolików (w ciągu dnia):</strong>{" "}
					{totalTablesDuringDay}
				</div>
				<div className="info-item">
					<strong>Łączna liczba wynosów:</strong> {totalWynos}
				</div>
				<div className="info-item">
					<strong>Łączna kwota:</strong> {totalAmount} PLN
				</div>
			</div>
		</div>
	);
};

export default ManagerPanel;
