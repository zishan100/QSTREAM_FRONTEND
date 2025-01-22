import React from "react";
import styles from "./Selects.module.css";
import { sortBy } from "../../Utils/Const";

export default function Selects({ eventSelect }) {
  return (
    <div className={styles.customSelect}>
      <p className={styles.selectTitle}>SortBy: </p>
      <select id="sortBy" name="sortName" onClick={eventSelect}>
        {sortBy.map((items, idx) => (
          <option key={idx} value={items}>
            {items}
          </option>
        ))}
      </select>
    </div>
  );
}
