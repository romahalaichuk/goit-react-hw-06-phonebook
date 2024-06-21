import React, { useState, useEffect, useRef } from "react";
import "./MenuManager.css";
import { products } from "./Produkt";
import PaymentManager from "./PaymentManager";
import {
	getSelectedItems,
	addSelectedItem,
	removeSelectedItem,
	clearSelectedItems,
	updateSelectedItems,
} from "./LocalStorageManager";

const categories = [
	"Przystawki",
	"Pizza",
	"Makaron",
	"Menu sezonowe",
	"Desery",
	"Napój bezalkoholowy",
	"Wina",
	"Drinki",
];

const MenuManager = ({ tableName, onClose, onAddProduct, resetTable }) => {
	const [selectedItems, setSelectedItems] = useState([]);
	const [showMenuItemsModal, setShowMenuItemsModal] = useState(false);
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [menuItems, setMenuItems] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(categories[0]);
	const [tableStatus, setTableStatus] = useState("free");
	const [currentTableName, setCurrentTableName] = useState(tableName);
	const [paymentComplete, setPaymentComplete] = useState(false);
	const [commentItem, setCommentItem] = useState(null);

	const modalRef = useRef(null);

	useEffect(() => {
		setCurrentTableName(tableName);
		const storedSelectedItems = getSelectedItems(tableName);
		if (storedSelectedItems.length > 0) {
			setSelectedItems(storedSelectedItems);
			setTableStatus("occupied");
		} else {
			setSelectedItems([]);
			setTableStatus("free");
		}
		setPaymentComplete(false);
	}, [tableName]);

	useEffect(() => {
		if (showMenuItemsModal) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showMenuItemsModal]);

	const handleClickOutside = (e) => {
		if (modalRef.current && !modalRef.current.contains(e.target)) {
			setShowMenuItemsModal(false);
		}
	};

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
		const filteredItems = products.filter((item) => item.category === category);
		setMenuItems(filteredItems);
		setShowMenuItemsModal(true);
		setShowPaymentModal(false);
		setSearchResults([]);
		setSearchTerm("");
	};

	const handleSearchChange = (e) => {
		const term = e.target.value.trim().toLowerCase();
		setSearchTerm(e.target.value);
		if (term === "") {
			setSearchResults([]);
		} else {
			const filteredItems = products.filter((item) =>
				item.name.toLowerCase().includes(term)
			);
			setSearchResults(filteredItems);
		}
	};

	const handleItemSelect = (item) => {
		const existingItem = selectedItems.find((i) => i.id === item.id);

		if (existingItem) {
			const updatedItems = selectedItems.map((i) =>
				i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
			);
			setSelectedItems(updatedItems);
			updateLocalStorage(updatedItems);
		} else {
			const updatedItems = [...selectedItems, { ...item, quantity: 1 }];
			setSelectedItems(updatedItems);
			updateLocalStorage(updatedItems);
		}

		setSearchResults([]);
		setSearchTerm("");

		onAddProduct(item.id, item.name, item.price);
		addSelectedItem(
			tableName,
			item.id,
			item.name,
			item.price,
			item.comment || ""
		);
	};

	const handleItemRemove = (itemId) => {
		const updatedItems = selectedItems.map((item) =>
			item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
		);
		const filteredItems = updatedItems.filter((item) => item.quantity > 0);
		setSelectedItems(filteredItems);
		updateLocalStorage(filteredItems);
		removeSelectedItem(tableName, itemId);
	};

	const handleCommentChange = (comment, itemId) => {
		const updatedItems = selectedItems.map((item) =>
			item.id === itemId ? { ...item, comment: comment } : item
		);
		setSelectedItems(updatedItems);
		updateSelectedItems(tableName, updatedItems);
	};

	const handleRozliczClick = () => {
		setShowPaymentModal(true);
	};

	const handlePaymentComplete = () => {
		setSelectedItems([]);
		clearSelectedItems(tableName);
		setShowPaymentModal(false);
		setTableStatus("free");
		setCurrentTableName(tableName); // Ustawienie oryginalnej nazwy stołu
		resetTable(); // Reset stołu
		onClose(); // Zamknięcie MenuManager
	};

	const calculateTotalItemsAndAmount = () => {
		const totalItems = selectedItems.reduce(
			(total, item) => total + item.quantity,
			0
		);
		const totalAmount = selectedItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
		return { totalItems, totalAmount };
	};

	const updateLocalStorage = (items) => {
		localStorage.setItem(`selectedItems_${tableName}`, JSON.stringify(items));
	};

	const { totalItems, totalAmount } = calculateTotalItemsAndAmount();

	return (
		<div className={`menu-manager-overlay ${tableStatus}`}>
			<div className="menu-manager" ref={modalRef}>
				<div className="menu-header">
					<h2>{currentTableName}</h2>
					<button className="close-button" onClick={onClose}>
						Zamknij
					</button>
				</div>
				<div className="category-buttons">
					{categories.map((category, index) => (
						<button
							key={category}
							onClick={() => handleCategoryClick(category)}
							className={category === selectedCategory ? "active" : ""}>
							{category}
						</button>
					))}
				</div>
				<div className="search-bar">
					<input
						type="text"
						placeholder="Szukaj produktu..."
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					{searchTerm.trim() !== "" && (
						<div className="search-suggestions">
							{searchResults.map((item) => (
								<div
									key={item.id}
									className="search-suggestion"
									onClick={() => handleItemSelect(item)}>
									{item.name} - {item.price} zł
								</div>
							))}
						</div>
					)}
				</div>
				{showMenuItemsModal && (
					<div className="menu-items-modal">
						<div className="menu-items">
							<h3>Menu - {selectedCategory}</h3>
							<ul>
								{menuItems.map((item) => (
									<li key={item.id}>
										{item.name} - {item.price} zł
										<button onClick={() => handleItemSelect(item)}>
											Dodaj
										</button>
									</li>
								))}
							</ul>
							<div className="modal-buttons">
								<button onClick={() => setShowMenuItemsModal(false)}>
									Zamknij
								</button>
							</div>
						</div>
					</div>
				)}
				<div className="selected-items">
					<h3>Wybrane produkty</h3>
					<ul>
						{selectedItems.map((item, index) => (
							<li key={`${item.id}-${index}`}>
								{item.name} - {item.price ? item.price : 0} zł x {item.quantity}{" "}
								= {item.price ? item.price * item.quantity : 0} zł
								<input
									type="text"
									value={item.comment || ""}
									placeholder="Komentarz"
									onChange={(e) => handleCommentChange(e.target.value, item.id)}
								/>
								<button onClick={() => handleItemRemove(item.id)}>-</button>
								<button onClick={() => handleItemSelect(item)}>+</button>
							</li>
						))}
					</ul>
					<p>Liczba pozycji: {totalItems}</p>
					<p>Suma: {totalAmount} zł</p>
				</div>
				<div className="modal-buttons">
					<button onClick={onClose}>Zamknij</button>
					{selectedItems.length > 0 && (
						<button onClick={handleRozliczClick}>Rozlicz</button>
					)}
				</div>
				{showPaymentModal && (
					<div className="payment-modal">
						<PaymentManager
							selectedItems={selectedItems}
							totalAmount={totalAmount}
							onClose={handlePaymentComplete}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default MenuManager;
