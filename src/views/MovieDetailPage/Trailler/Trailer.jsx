import { useEffect, useState } from "react";
import * as api from "../../../api/movieApi";
import s from "../Trailler/Trailer.module.css";
export default function Trailer({ movieId }) {
  const [trailer, setTrailer] = useState([]);
  useEffect(() => {
    api
      .fetchVideoTrailer(movieId)
      .then((movie) => {
        setTrailer(movie.results[0] || [1]);
      })
      .catch((error) => error.message);
  }, [movieId]);
  return (
    <div className={s.trailer__wrap}>
      {trailer && (
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}`}
          className={s.trailer}
          title={trailer.name}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
