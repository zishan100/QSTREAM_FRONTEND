import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import style from "./Search.module.css";
import { SearchContext } from "../../Utils/contextSearch";

export default function Search() {
  const { searchEvent } = useContext(SearchContext);

  return (
    <div className={style.searchContainer}>
      <SearchIcon className={style.logo} />
      <input
        type="text"
        placeholder="Search..."
        className={style.searchField}
        onChange={searchEvent}
      />
    </div>
  );
}
