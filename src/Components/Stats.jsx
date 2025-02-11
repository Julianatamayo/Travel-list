import PropTypes from "prop-types";
import { useLanguage } from "../context/LanguageContext";

const Stats = ({ items }) => {
  const { t } = useLanguage();

  if (!items.length) {
    return (
      <footer className="stats">
        <em>{t("emptyList")}</em>
      </footer>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? t("allPacked")
          : t("stats", { numItems, numPacked, percentage })}
      </em>
    </footer>
  );
};

Stats.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      packed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default Stats;
