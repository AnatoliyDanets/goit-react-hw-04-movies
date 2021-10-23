import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import s from "../SearchBar/SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [searchName, setSearchName] = useState("");

  const handleChange = (event) => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchName.trim() === "") {
      toast.info("empty string");
      return;
    }

    onSubmit(searchName);
    setSearchName("");
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <input
        className={s.form__input}
        type="text"
        value={searchName}
        autoComplete="off"
        autoFocus
        placeholder="search movie "
        onChange={handleChange}
        name="searchName"
        // className={styles.input}
      />
      <button className={s.btn} type="submit">
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
