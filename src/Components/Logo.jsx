import { useLanguage } from "../context/LanguageContext";

const Logo = () => {
  const { t } = useLanguage();
  return <h1>{t("title")}</h1>;
};

export default Logo;
