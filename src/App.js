// import logo from './logo.svg';
import "./App.css";
import Header from "./components/Header/";
import Contaner from "./components/Container/";
import { Route, Switch } from "react-router";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderComponent from "./components/Loader/Loader";

const HomePage = lazy(() =>
  import("./views/HomePage" /* webpackChunkName: "homePage" */)
);
const MovieDetailPage = lazy(() =>
  import("./views/MovieDetailPage" /* webpackChunkName: "MovieDetailPage" */)
);
const NotFoundPage = lazy(() =>
  import("./views/NotFoundPage" /* webpackChunkName: "NotFoundPage" */)
);
const MoviesPage = lazy(() =>
  import("./views/MoviesPage" /* webpackChunkName: "searcPage" */)
);

function App() {
  return (
    <Contaner>
      <Header />
      <Suspense fallback={<LoaderComponent />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer autoClose={3000} />
    </Contaner>
  );
}

export default App;
