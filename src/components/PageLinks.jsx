import { NavLink } from "react-router-dom";
import styles from "./PageLinks.module.css";

function PageLinks() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">product</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageLinks;
