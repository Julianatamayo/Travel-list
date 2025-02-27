import { useState } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "../context/LanguageContext";

const Form = ({ onAddItems }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { t } = useLanguage();

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>{t("formTitle")}</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder={t("itemPlaceholder")}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>{t("addButton")}</button>
    </form>
  );
};

Form.propTypes = {
  onAddItems: PropTypes.func.isRequired,
};

export default Form;
