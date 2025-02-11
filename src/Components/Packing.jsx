import PropTypes from "prop-types";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const Packing = ({ items, onDeleteItem, onToggleItem, onClearList }) => {
  const [sortBy, setSortBy] = useState("input");
  const { t } = useLanguage();

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">{t("sortByInput")}</option>
          <option value="description">{t("sortByDescription")}</option>
          <option value="packed">{t("sortByPacked")}</option>
        </select>
        <button onClick={onClearList}>{t("clearList")}</button>
      </div>

      <ul>
        {sortedItems.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              value={item.packed}
              onChange={() => onToggleItem(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
              {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Packing.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      packed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onToggleItem: PropTypes.func.isRequired,
  onClearList: PropTypes.func.isRequired,
};

export default Packing;
