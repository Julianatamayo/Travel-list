import { useState } from "react";
import "./App.css";
import Logo from "./Components/Logo";
import Form from "./Components/Form";
import Packing from "./Components/Packing";
import Stats from "./Components/Stats";
import LanguageSelector from "./Components/LanguageSelector";
import { LanguageProvider } from "./context/LanguageContext";
import { useLanguage } from "./context/LanguageContext";

function AppContent() {
  const [items, setItems] = useState([]);
  const { t } = useLanguage();

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(t("clearConfirm"));
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <LanguageSelector />
      <Logo />
      <Form onAddItems={handleAddItems} />
      <Packing
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
