import s from "../Container/Container.module.css";
export default function Contaner({ children }) {
  return <div className={s.container}>{children}</div>;
}
