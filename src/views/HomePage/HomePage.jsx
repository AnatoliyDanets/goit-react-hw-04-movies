import { useState, useEffect } from "react";
import MovieGalleryListItem from "../../components/MovieGalleryListItem";
import * as api from "../../api/movieApi";
import s from "../HomePage/HomePage.module.css";
import { Pagination, PaginationItem } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function HomePage(props) {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(
    parseInt(location.search?.split("=")[1] || 1)
  );
  const [totalPage, setTotalPage] = useState(0);
  const [EN, setEN] = useState("en-US");
  const RU = "ru-RU";
  useEffect(() => {
    fetchApi(EN, page);
  }, [EN, page]);

  const fetchApi = (lang, page) => {
    api
      .fetchMovieTrend(lang, page)
      .then((movie) => {
        setMovies(movie.results);
        setTotalPage(movie.total_pages);
        setPage(page);
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
      {page && (
        <Pagination
          className={s.Pagination}
          size="large"
          count={totalPage}
          page={page}
          onChange={(_, num) => setPage(num)}
          showFirstButton
          showLastButton
          renderItem={(item) => (
            <PaginationItem
              component={NavLink}
              to={`/?page=${item.page}`}
              {...item}
            />
          )}
        />
      )}
    </div>
  );
}
