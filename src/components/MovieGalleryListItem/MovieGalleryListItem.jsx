import { Link, useLocation } from "react-router-dom";
import s from "../MovieGalleryListItem/MovieGalleryListItem.module.css";
import defaultImages from "../../image/defaultImages.jpg";
export default function MovieGalleryListItem({ title, name, id, image }) {
  const location = useLocation();
  return (
    <li key={id} className={s.popular__item}>
      <Link
        to={{
          pathname: `/movies/${id}`,
          state: { from: location },
        }}
        className={s.popular__link}
      >
        <img
          className={s.popular__image}
          src={
            image ? `https://image.tmdb.org/t/p/w300/${image}` : defaultImages
          }
          alt={title}
        />
        <div className={s.popular__info}>
          <p className={s.popular__title}>{title ? title : name}</p>
        </div>
      </Link>
    </li>
  );
}
