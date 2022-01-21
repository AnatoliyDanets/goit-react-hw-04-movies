import { useState, useEffect } from "react";
import MovieGalleryListItem from "../../components/MovieGalleryListItem";
import * as api from "../../api/movieApi";
import s from "../HomePage/HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [EN, setEN] = useState("en-US");
  const RU = "ru-RU";
  useEffect(() => {
    fetchApi(EN);
  }, [EN]);

  const fetchApi = (lang) => {
    api
      .fetchMovieTrend(lang)
      .then((movie) => {
        console.log(movie);
        setMovies(movie.results);
      })
      .catch((error) => console.log(error));
  };

  return (
      <div className={s.detail__wrapper}>
      <button
        type="button"
        className={s.detail__btn}
        onClick={() => {
          setEN(RU);
        }}
      >
        RU
      </button>
      <button
        type="button"
        className={s.detail__btn}
        onClick={() => {
          setEN("");
        }}
      >
        EN
      </button>
      <ul className={s.popular__list}>
        {movies &&
          movies.map(({ title, name, id, poster_path }) => (
            <MovieGalleryListItem
              title={title}
              name={name}
              id={id}
              key={id}
              image={poster_path}
            />
          ))}
      </ul>
     </div >
  );
}
