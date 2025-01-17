import React from "react";
import { Button } from "@mui/material";
import styles from "./Button.module.css";

export default function ({ modal, variant, btnText, CloudUpload, component }) {
  return (
    <div>
      {btnText === "Upload" ? (
        <Button
          component={component}
          className={styles.btnStyle}
          variant={variant}
          onClick={modal}
          startIcon={<CloudUpload />}
        >
          {btnText}
        </Button>
      ) : (
        <Button className={styles.btnStyle} variant={variant} onClick={modal}>
          {btnText}
        </Button>
      )}
    </div>
  );
}
