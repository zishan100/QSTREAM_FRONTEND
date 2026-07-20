import React, { useState, useContext } from "react";
import style from "./Headers.module.css";
import Navbar from "../Navbar/Navbar";
import Navfilter from "../Navfilter/Navfilter";
import { filterType, filterSelect } from "../../Utils/Helpers";
import Selects from "../Selects/Selects";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { SearchContext } from "../../Utils/contextSearch";
import { useLocation } from "react-router-dom";

export default function Headers({ selectEventHandle, filter }) {
  const { searchEvent } = useContext(SearchContext);
  const { pathname } = useLocation();

  return (
    <div className="2xl:container bg-primary text-primary pt-2 mb-3">
      <Navbar />
      {pathname === "/" && (
        <div className={style.searchContainer}>
          <input
            type="text"
            className={style.searchInput}
            placeholder="Search..."
            onChange={searchEvent}
          />
          <div className={style.searchIconContainer}>
            <SearchIcon className={style.searchIcon} />
          </div>
        </div>
      )}
      <Navfilter
        navFilter={filter["genre"]}
        eventSelect={selectEventHandle}
        id="genre"
      />
      <Navfilter
        navFilter={filter["age"]}
        eventSelect={selectEventHandle}
        id="age"
      />
    </div>
  );
}
