import React, { useState } from "react";
import "./App.css";
import Headers from "./components/Headers/Headers";
import Sections from "./components/Sections/Sections";
import { filterType, filterSelect } from "./Utils/Helpers";
import { SearchContext } from "./Utils/contextSearch";

function App() {
  const [filter, setFilter] = useState({ ...filterType });
  const [search, setSearch] = useState("");

  const searchEvent = (e) => {
    setSearch(e.target.value);
  };

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
    } else if (type === "age") {
      // console.log(filter[type]);
      let lists = filter[type];
      lists = filterSelect(selectVal, lists, type);
      setFilter({ ...filter, age: lists });
    } else {
      let { name, value } = e.currentTarget;
      // console.log(name, " ", value);
      value =
        value.split(" ")[0].toLowerCase() +
        value.split(" ")[1].charAt(0).toUpperCase() +
        value.split(" ")[1].substring(1);
      // console.log(value);
      setFilter({ ...filter, sortBy: value });
    }
  };

  return (
    <div className="2xl:container">
      <SearchContext.Provider value={{ searchEvent }}>
        <Headers selectEventHandle={selectEventHandle} filter={filter} />
        <Sections filter={filter} search={search} />
      </SearchContext.Provider>
    </div>
  );
}

export default App;
