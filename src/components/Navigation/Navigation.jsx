import { NavLink } from "react-router-dom";

import s from "../Navigation/Navigation.module.css";

export default function Navigation() {
  return (
    <div>
      <nav>
        <NavLink to="/" className={s.nav} activeClassName={s.active} exact>
          Home
        </NavLink>
        <NavLink to="/movies" className={s.nav} activeClassName={s.active}>
          Movies
        </NavLink>
      </nav>
    </div>
  );
}
