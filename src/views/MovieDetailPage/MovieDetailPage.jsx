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

const Cast = lazy(() => import("./Cast" /* webpackChunkName: "Cast" */));
const Review = lazy(() => import("./Review" /* webpackChunkName: "Review" */));

export default function MovieDetailPage() {
  // const searchName = new URLSearchParams(location.search).get("query") ?? "";
  const { movieId } = useParams();
  const [movies, setMovies] = useState(null);
  const { url } = useRouteMatch();
  const location = useLocation(String);
  const history = useHistory();
  console.log(location);
  useEffect(() => {
    api
      .fetchMovieDetails(movieId)
      .then((movie) => {
        console.log(movie);

        setMovies(movie);
      })
      .catch((error) => console.log(error));
  }, [movieId]);

  const goBack = () => {
    history.push(location?.state?.from ?? "/");
  };
  return (
    <div className={s.detail__wrapper}>
      <button className={s.detail__btn} type="button" onClick={goBack}>
        Go back
      </button>
      {movies ? (
        <div>
          {movies && (
            <div className={s.detail__info}>
              <div>
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
              </div>
              <div className={s.detail__info_wrapper}>
                <h1 className={s.detail__title}>{movies.title}</h1>
                <p className={s.detail__title_score}>
                  User Score: {movies.vote_average * 10}%
                </p>

                <h3 className={s.detail__title_avantages}>Overview</h3>
                <p className={s.detail__title_score}>{movies.overview}</p>

                {movies.genres && (
                  <>
                    <h3 className={s.detail__title_avantages}>Genres</h3>
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
          )}
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
      ) : (
        <p className={s.detail__notinfo}>Not information (</p>
      )}
    </div>
  );
}
