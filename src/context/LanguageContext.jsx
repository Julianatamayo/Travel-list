import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { translations } from "../translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("es");

  const value = {
    language,
    setLanguage,
    t: (key, params = {}) => {
      let text = translations[language][key] || key;
      Object.keys(params).forEach((param) => {
        text = text.replace(`{${param}}`, params[param]);
      });
      return text;
    },
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLanguage = () => useContext(LanguageContext);
