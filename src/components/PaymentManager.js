import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./PaymentManager.css";

const PaymentManager = ({ selectedItems, onClose }) => {
	const [amountGiven, setAmountGiven] = useState("");
	const [changeAmount, setChangeAmount] = useState(0);
	const [selectedPaymentType, setSelectedPaymentType] = useState(null);
	const [modalVisible, setModalVisible] = useState(true);

	useEffect(() => {
		const totalAmount = selectedItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
		const amountGivenNumber = parseFloat(amountGiven);
		if (!isNaN(amountGivenNumber)) {
			const change = amountGivenNumber - totalAmount;
			setChangeAmount(change > 0 ? change : 0);
		} else {
			setChangeAmount(0);
		}
	}, [amountGiven, selectedItems]);

	const handleFinalizePayment = () => {
		console.log("Płatność została zakończona");
		onClose();
		setSelectedPaymentType(null); // Resetuje selectedPaymentType po zakończeniu płatności
		setAmountGiven(""); // Resetuje wartość amountGiven
		setChangeAmount(0); // Resetuje wartość changeAmount
	};

	const handlePaymentTypeClick = (paymentType) => {
		setSelectedPaymentType(paymentType);
	};

	const handleCancelPayment = () => {
		if (selectedPaymentType === null) {
			setModalVisible(false);
		} else {
			setSelectedPaymentType(null);
		}
	};

	const handleBackToPaymentTypeSelection = () => {
		setSelectedPaymentType(null);
		setModalVisible(true); // Pokazuje ponownie modal
	};

	return modalVisible ? (
		<div className="modal">
			<div className="modal-content">
				<div className="payment-header">
					{selectedPaymentType === null ? (
						<React.Fragment>
							<h2>Rozliczenie zamówienia</h2>
							<button className="close-button" onClick={handleCancelPayment}>
								X
							</button>
						</React.Fragment>
					) : (
						<React.Fragment>
							<button
								className="close-button"
								onClick={handleBackToPaymentTypeSelection}>
								X
							</button>
						</React.Fragment>
					)}
				</div>

				{selectedPaymentType === null ? (
					<div className="payment-options">
						<button
							className="button-pay"
							onClick={() => handlePaymentTypeClick("cash")}>
							Gotówka
						</button>
						<button
							className="button-pay"
							onClick={() => handlePaymentTypeClick("card")}>
							Karta
						</button>
					</div>
				) : null}

				{selectedPaymentType === "cash" && (
					<div className="cash-payment">
						<h3>
							Do zapłaty:{" "}
							{selectedItems.reduce(
								(total, item) => total + item.price * item.quantity,
								0
							)}{" "}
							zł
						</h3>
						<input
							type="number"
							value={amountGiven}
							onChange={(e) => setAmountGiven(e.target.value)}
							placeholder="Kwota od klienta"
						/>
						<p>Reszta: {changeAmount} zł</p>
						<button className="finalize-button" onClick={handleFinalizePayment}>
							Opłacone
						</button>
					</div>
				)}

				{selectedPaymentType === "card" && (
					<div className="card-payment">
						<h3>Implementacja płatności kartą</h3>
						<button className="finalize-button" onClick={handleFinalizePayment}>
							Opłacone kartą
						</button>
					</div>
				)}
			</div>
		</div>
	) : null;
};

export default PaymentManager;
