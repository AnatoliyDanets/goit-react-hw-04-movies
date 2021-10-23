import Navigation from "../Navigation";
import s from "../Header/Header.module.css";
export default function Header() {
  return (
    <div className={s.header}>
      <Navigation />
    </div>
  );
}
