import { useState, useEffect } from "react";
import * as api from "../../../api/movieApi";
import s from "../Cast/Cast.module.css";
import defaultImages from "../../../image/defaultImages.jpg";

export default function Cast({ movieId }) {
  const [cast, setCast] = useState(null);
  useEffect(() => {
    api
      .fetchActorsDetail(movieId)
      .then((actor) => {
        setCast(actor.cast.slice(0, 12));
      })
      .catch((error) => error.message);
  }, [movieId]);
  return (
    <div className={s.cast__wrap}>
      {cast && (
        <ul className={s.cast__list}>
          {cast.map(({ profile_path, name, character, id }) => {
            return (
              <li className={s.cast__item} key={id}>
                <img
                  className={s.cast__image}
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w200/${profile_path}`
                      : defaultImages
                  }
                  alt={name}
                  // width="250"
                />
                <div className={s.cast_name}>
                  <h3 className={s.cast__title}>{name}</h3>
                  <p className={s.cast__p}>Character: {character}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
