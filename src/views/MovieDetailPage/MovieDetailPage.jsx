/* eslint-disable react-hooks/exhaustive-deps */
import {
  Route,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
// import { Route, Switch } from "react-router";
import { useState, useEffect, lazy, Suspense } from "react";
import * as api from "../../api/movieApi";
import defaultImages from "../../image/defaultImages.jpg";
import { NavLink } from "react-router-dom";
import s from "../MovieDetailPage/MovieDetailPage.module.css";
import LoaderComponent from "../../components/Loader";
import Trailer from "./Trailler/Trailer";

const Cast = lazy(() => import("./Cast" /* webpackChunkName: "Cast" */));
const Review = lazy(() => import("./Review" /* webpackChunkName: "Review" */));

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const [movies, setMovies] = useState(null);
  const [EN, setEN] = useState("en-US");
  const RU = "ru-RU";
  const [yes, setYes] = useState(false);
  const { url } = useRouteMatch();
  const location = useLocation(String);
  const history = useHistory();
  const title = {
    rate: { en: "User Score:", ru: "Оценка пользователей:" },
    overview: { en: "Overview", ru: "Обзор" },
    genres: { en: "Genres", ru: "Жанры" },
  };

  const fetchFilms = async (lang) => {
    const movie = await api.fetchMovieDetails(movieId, lang);
    const films = setMovies(movie);
    return films;
  };

  useEffect(() => {
    fetchFilms(EN);
  }, [EN]);

  // const getRusLang = () => {
  //   api
  //     .fetchLanguage(movieId)
  //     .then((data) => {
  //       setRU(data.translations.find((el) => el.name === "Pусский").data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const goBack = () => {
    history.push(location?.state?.from ?? "/");
  };

  return (
    <div className={s.detail__wrapper}>
      <button className={s.detail__btn} type="button" onClick={goBack}>
        Go back
      </button>

      <button
        type="button"
        className={s.detail__btn}
        onClick={() => {
          setEN(RU);
          setYes(true);
        }}
      >
        RU
      </button>
      <button
        type="button"
        className={s.detail__btn}
        onClick={() => {
          setEN("");
          setYes(false);
          console.log(EN);
        }}
      >
        EN
      </button>
      {
        movies && (
          <div>
            <div className={s.detail__info}>
              <img
                className={s.detail__image}
                src={
                  movies.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movies.poster_path}`
                    : defaultImages
                }
                alt={movies.title}
                width="250"
              />

              <div className={s.detail__info_wrapper}>
                <h1 className={s.detail__title}>{movies.title}</h1>
                <p className={s.detail__title_score}>
                  {!yes ? title.rate.en : title.rate.ru}{" "}
                  {movies.vote_average * 10}%
                </p>

                <h3 className={s.detail__title_avantages}>
                  {!yes ? title.overview.en : title.overview.ru}
                </h3>
                <p className={s.detail__title_score}>{movies.overview}</p>
                {movies.genres && (
                  <>
                    <h3 className={s.detail__title_avantages}>
                      {!yes ? title.genres.en : title.genres.ru}
                    </h3>
                    <ul className={s.detail__genres}>
                      {movies.genres.map(({ id, name }) => (
                        <li key={id} className={s.detail__genres_item}>
                          {name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            <Trailer movieId={movieId} />
            <div className={s.detail__add_wrap}>
              <p className={s.detail__title_add}>Additional information</p>
              <div className={s.detail_add}>
                {movies && (
                  <ul className={s.detail_add_list}>
                    <li className={s.detail_add_item}>
                      <NavLink
                        className={s.detail_add_link}
                        activeClassName={s.active}
                        to={{
                          pathname: `${url}/cast`,
                          state: { ...location.state },
                        }}
                        exact
                      >
                        Cast
                      </NavLink>
                    </li>
                    <li className={s.detail_add_item}>
                      <NavLink
                        className={s.detail_add_link}
                        activeClassName={s.active}
                        to={{
                          pathname: `${url}/review`,
                          state: { ...location.state },
                        }}
                      >
                        Review
                      </NavLink>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div>
              <Suspense fallback={<LoaderComponent />}>
                <Route path="/movies/:movieId/cast">
                  <Cast movieId={movieId} />
                </Route>
                <Route path="/movies/:movieId/review">
                  <Review movieId={movieId} />
                </Route>
              </Suspense>
            </div>
          </div>
        )
        // : (
        //   <p className={s.detail__notinfo}>Not information (</p>
        // )
      }
    </div>
  );
}
