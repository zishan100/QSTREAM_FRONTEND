import React, { useState } from "react";
import styles from "./Headers.module.css";
import Navbar from "../Navbar/Navbar";
import Navfilter from "../Navfilter/Navfilter";
import { filterType, filterSelect } from "../../Utils/Helpers";
import Selects from "../Selects/Selects";

export default function Headers({ selectEventHandle, filter }) {
  return (
    <div className="2xl:container bg-primary text-primary py-2 mb-3">
      <Navbar />
      <div className="2xl:container flex justify-center my-3">
        <Navfilter
          navFilter={filter["genre"]}
          eventSelect={selectEventHandle}
          id="genre"
        />
        <Selects eventSelect={selectEventHandle} />
      </div>
      <Navfilter
        navFilter={filter["age"]}
        eventSelect={selectEventHandle}
        id="age"
      />
    </div>
  );
}
