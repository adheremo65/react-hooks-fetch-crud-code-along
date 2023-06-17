import React from "react";
import ShoppingList from "./ShoppingList";

function Item({ item, onUpdateItem, handleDeletedItem }) {
  function handleAddToCartClick(e) {
    console.log("ShoppingList", item);
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ isInCart: !item.isInCart }),
    })
      .then((res) => res.json())
      .then((updated) => onUpdateItem(updated));
  }

  function handleDelete(gone) {
    console.log(gone);
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => handleDeletedItem(item));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        onClick={handleAddToCartClick}
        className={item.isInCart ? "remove" : "add"}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick={handleDelete} className="remove">
        Delete
      </button>
    </li>
  );
}

export default Item;
