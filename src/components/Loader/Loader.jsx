import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "../Loader/Loader.module.css";
export default function LoaderComponent() {
  return (
    <Loader
      className={s.loader}
      type="Grid"
      color="#00BFFF"
      height={80}
      width={80}
    />
  );
}
