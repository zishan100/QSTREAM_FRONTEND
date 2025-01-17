import React from "react";
import style from "./Navfilter.module.css";

export default function Navfilter({ navFilter, eventSelect, id }) {
  return (
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
    </ul>
  );
}
