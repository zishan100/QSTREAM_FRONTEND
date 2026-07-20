import React from "react";
import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className={styles.logoDesign}>
      <Link to="/">QStream</Link>
    </div>
  );
}
