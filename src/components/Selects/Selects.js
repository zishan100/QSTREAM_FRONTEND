import React from "react";
import styles from "./Selects.module.css";
import { sortBy } from "../../Utils/Const";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

export default function Selects({ eventSelect }) {

  // return (
  //   <div>
  //     <FormControl sx={{ m: 1, minWidth: 220 }}>
  //       <Select
  //         value=""
  //         onChange={handleChange}
  //         displayEmpty
  //         inputProps={{ 'aria-label': 'Without label' }}
  //       >
  //         {
  //           soryBy.map((items, idx) => {
  //             <MenuItem key={idx} value={items}>
  //               {items}
  //             </MenuItem>     
  //           })
  //         }
  //       </Select>
  //     </FormControl>
  //   </div>
  // )

  return (
    <div className={styles.customSelect}>
      <CompareArrowsIcon sx={{ fontSize: 25, margin: '0px 10px 0px 5px' }} />
      <p>SortBy: </p>
      <select id="sortBy" name="sortName" onChange={eventSelect}>
        {sortBy.map((items, idx) => (
          <option key={idx} value={items}>
            {items}
          </option>
        ))}
      </select>
    </div>
  );
}
