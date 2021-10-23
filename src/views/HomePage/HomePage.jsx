import { useState, useEffect } from "react";
import MovieGalleryListItem from "../../components/MovieGalleryListItem";
import * as api from "../../api/movieApi";
import s from "../HomePage/HomePage.module.css";

export default function HomePage() {
  // const { url } = useRouteMatch();
  // console.log(url);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = () => {
    api
      .fetchMovieTrend()
      .then((movie) => {
        console.log(movie);
        setMovies((movies) => [...movies, ...movie.results]);
      })
      .catch((error) => console.log(error));
  };
  return (
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
  );
}
