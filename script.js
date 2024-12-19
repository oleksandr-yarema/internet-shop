// LocalStorage key
const STORAGE_KEY = "shopItems";

// DOM Elements
const itemList = document.getElementById("item-list");
const totalPriceEl = document.getElementById("total-price");
const searchInput = document.getElementById("search");
const sortButtonPrice = document.getElementById("sort-price");
const sortButtonQuantity = document.getElementById("sort-quantity");

// Get data from LocalStorage
const getItems = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Save data to LocalStorage
const saveItems = (items) => localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

// Render items in the table
const renderItems = (items) => {
    itemList.innerHTML = "";
    let totalPrice = 0;

    items.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td class="actions">
                <button class="edit" onclick="editItem(${index})">Edit</button>
                <button class="delete" onclick="deleteItem(${index})">Delete</button>
            </td>
        `;
        itemList.appendChild(row);
    });

    totalPriceEl.textContent = totalPrice.toFixed(2);
};

// Add a new item
document.getElementById("add-item").addEventListener("click", () => {
    const name = prompt("Enter item name:");
    const price = parseFloat(prompt("Enter item price:"));
    const quantity = parseInt(prompt("Enter item quantity:"), 10);

    if (name && !isNaN(price) && !isNaN(quantity)) {
        const items = getItems();
        items.push({ name, price, quantity });
        saveItems(items);
        renderItems(items);
    } else {
        alert("Invalid input!");
    }
});

// Edit an item
const editItem = (index) => {
    const items = getItems();
    const item = items[index];

    const newName = prompt("Edit item name:", item.name);
    const newPrice = parseFloat(prompt("Edit item price:", item.price));
    const newQuantity = parseInt(prompt("Edit item quantity:", item.quantity), 10);

    if (newName && !isNaN(newPrice) && !isNaN(newQuantity)) {
        items[index] = { name: newName, price: newPrice, quantity: newQuantity };
        saveItems(items);
        renderItems(items);
    } else {
        alert("Invalid input!");
    }
};

// Delete an item
const deleteItem = (index) => {
    const items = getItems();
    items.splice(index, 1);
    saveItems(items);
    renderItems(items);
};

// Search items
searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const items = getItems();
    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(query));
    renderItems(filteredItems);
});

// Sort items by price
sortButtonPrice.addEventListener("click", () => {
    const items = getItems();
    items.sort((a, b) => a.price - b.price);
    saveItems(items);
    renderItems(items);
});

// Sort items by quantity
sortButtonQuantity.addEventListener("click", () => {
    const items = getItems();
    items.sort((a, b) => a.quantity - b.quantity);
    saveItems(items);
    renderItems(items);
});

// Initial render
renderItems(getItems());