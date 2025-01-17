import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import  style from './Search.module.css'

export default function Search() {
  return (
    <div className={style.searchContainer}>
        <SearchIcon  className={style.logo} />
        <input type="text" placeholder="Search..." className={style.searchField} />
    </div>
  )
}
