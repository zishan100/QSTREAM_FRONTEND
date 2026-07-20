import React, { useState } from "react";
import "./App.css";
import Headers from "./components/Headers/Headers";
import Sections from "./components/Sections/Sections";
import { filterType, filterSelect } from "./Utils/Helpers";
import { SearchContext } from "./Utils/contextSearch";
import { Routes, Route } from "react-router-dom";
import VideoDashboard from "./components/VideoDashboard/VideoDashboard";
import ProtectedRoute from "./Utils/ProtectedRoute";

function App() {
  const [filter, setFilter] = useState({ ...filterType });
  const [search, setSearch] = useState("");

  const searchEvent = (e) => {
    setSearch(e.target.value);
  };

  const selectEventHandle = (e) => {
    e.preventDefault();
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
      console.log(name, " ", value);
      value =
        value.split(" ")[0].toLowerCase() +
        value.split(" ")[1].charAt(0).toUpperCase() +
        value.split(" ")[1].substring(1);
      setFilter({ ...filter, sortBy: value });
    }
    console.log(filter, " Sections Component.");

  };

  return (
    <div className="2xl:container">
      <SearchContext.Provider value={{ searchEvent }}>
        <Headers selectEventHandle={selectEventHandle} filter={filter} />

        <Routes>
          <Route
            path="/"
            element={<Sections filter={filter} search={search} />}
          />

          <Route element={<ProtectedRoute />} >
            <Route path="videoDashboard" element={<VideoDashboard />} />
          </Route>
        </Routes>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
