import React from "react";
import styles from "./Selects.module.css";
import { sortBy } from "../../Utils/Const";

export default function Selects() {
  return (
    <div className={styles.customSelect}>
      <p className={styles.selectTitle}>SortBy: </p>
      <select>
        {sortBy.map((items, idx) => (
          <option key={idx} value={items}>
            {items}
          </option>
        ))}
      </select>
    </div>
  );
}
