import { useState, useEffect } from "react";
import * as api from "../../../api/movieApi";
import s from "../Review/Review.module.css";

export default function Review({ movieId }) {
  const [review, setReview] = useState([]);
  useEffect(() => {
    api
      .fetchReviews(movieId)
      .then((rev) => {
        console.log(rev);
        setReview(rev.results);
      })
      .catch((error) => console.log(error));
  }, [movieId]);
  return (
    <div>
      {review.length > 0 ? (
        <ul className={s.review}>
          {review.map(({ id, content, author }) => (
            <li key={id} className={s.review__item}>
              <h3 className={s.review__title}>{author}</h3>
              <p className={s.review__content}>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <b>We do not have any reviews for this movie</b>
      )}
    </div>
  );
}
