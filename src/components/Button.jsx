import styles from "./Button.module.css";
import PropTypes from "prop-types"; // Import PropTypes

function Button({ type, children, onClick }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired, // Add children prop validation
  onClick: PropTypes.func, // Add onClick prop validation
};

export default Button;
