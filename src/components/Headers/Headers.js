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

export default function Headers({ selectEventHandle, filter }) {
  const { searchEvent } = useContext(SearchContext);
  return (
    <div className="2xl:container bg-primary text-primary py-2 mb-3">
      <Navbar />

      <TextField
        className={style.searchBar}
        variant="outlined"
        placeholder="Search..."
        onChange={searchEvent}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon className={style.searchIcon} />
            </InputAdornment>
          ),
        }}
      />

      <div className="2xl:container flex justify-center my-3">
        <Navfilter
          navFilter={filter["genre"]}
          eventSelect={selectEventHandle}
          id="genre"
        />
      </div>
      <Navfilter
        navFilter={filter["age"]}
        eventSelect={selectEventHandle}
        id="age"
      />
    </div>
  );
}
