import { useState, useEffect } from "react";
import * as api from "../../api/movieApi";
import SearchBar from "../../components/SearchBar/SearchBar";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import MovieGalleryListItem from "../../components/MovieGalleryListItem";
import s from "../MoviesPage/MoviesPage.module.css";

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  const searchName = new URLSearchParams(location.search).get("query") ?? "";
  const handleSubmit = (query) => {
    history.push({ ...location, search: `query=${query}` });
  };
  useEffect(() => {
    if (!searchName) return;

    api
      .fetchSearch(searchName)
      .then((data) => {
        if (data.results.length !== 0) {
          setMovies(data.results);
        }

        if (data.results.length === 0) {
          toast.error(`Nothing found for your request"${searchName}!"`);
          setMovies([]);
        }
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line
  }, [searchName]);

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {movies && (
        <ul className={s.search__list}>
          {movies.map(({ title, id, name, poster_path }) => (
            <MovieGalleryListItem
              title={title}
              name={name}
              id={id}
              key={id}
              image={poster_path}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
