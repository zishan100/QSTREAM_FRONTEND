import React from "react";
import style from "./Navfilter.module.css";
import Selects from "../Selects/Selects";
import { useLocation } from "react-router-dom";

export default function Navfilter({ navFilter, eventSelect, id }) {
  const { pathname } = useLocation();

  return (
    pathname === "/" && (
      <ul
        className={style.horizontalList}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {navFilter &&
          navFilter.map(({ type, select }, idx) => {
            return (
              <li
                key={idx}
                className={select ? style.select : ""}
                id={id}
                onClick={(e) => eventSelect(e)}
              >
                {type}
              </li>
            );
          })}
        {id === "genre" && <Selects eventSelect={eventSelect} />}
      </ul>
    )
  );
}
