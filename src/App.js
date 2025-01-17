import React, { useState } from "react";
import "./App.css";
import Headers from "./components/Headers/Headers";
import Sections from "./components/Sections/Sections";
import { filterType, filterSelect } from "./Utils/Helpers";

function App() {
  const [filter, setFilter] = useState({ ...filterType });

  const selectEventHandle = (e) => {
    // console.log("event capturing");
    const type = e.currentTarget.id;
    const selectVal = e.currentTarget.textContent;

    if (type === "genre") {
      // console.log(filter["genre"]);
      let lists = filter[type];
      if (selectVal === "All") {
        lists = filterSelect(selectVal, lists);
      } else {
        lists = filterSelect(selectVal, lists);
      }
      setFilter({ ...filter, genre: lists });
    } else {
      // console.log(filter[type]);
      let lists = filter[type];
      lists = filterSelect(selectVal, lists, type);
      setFilter({ ...filter, age: lists });
    }
  };

  return (
    <div className="2xl:container">
      <Headers selectEventHandle={selectEventHandle} filter={filter} />
      <Sections filter={filter} />
    </div>
  );
}

export default App;
