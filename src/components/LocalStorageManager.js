export const getSelectedItems = (tableName) => {
	const storedItems = localStorage.getItem(`selectedItems_${tableName}`);
	return storedItems ? JSON.parse(storedItems) : [];
};

export const addSelectedItem = (
	tableName,
	productId,
	productName,
	productPrice,
	productComment = ""
) => {
	const selectedItems = getSelectedItems(tableName);
	const existingItem = selectedItems.find((item) => item.id === productId);

	if (existingItem) {
		existingItem.quantity += 1;
	} else {
		selectedItems.push({
			id: productId,
			name: productName,
			price: productPrice,
			quantity: 1,
			comment: productComment,
		});
	}

	localStorage.setItem(
		`selectedItems_${tableName}`,
		JSON.stringify(selectedItems)
	);
};

export const removeSelectedItem = (tableName, productId) => {
	const selectedItems = getSelectedItems(tableName);
	const updatedItems = selectedItems.filter((item) => item.id !== productId);
	localStorage.setItem(
		`selectedItems_${tableName}`,
		JSON.stringify(updatedItems)
	);
};

export const clearSelectedItems = (tableName) => {
	localStorage.removeItem(`selectedItems_${tableName}`);
};

export const updateSelectedItems = (tableName, items) => {
	localStorage.setItem(`selectedItems_${tableName}`, JSON.stringify(items));
};
