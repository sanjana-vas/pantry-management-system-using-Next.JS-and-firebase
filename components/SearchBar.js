import React from 'react'
import { InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchBar({ onSearch }) {
  return (
    <div>
      <SearchIcon />
      <InputBase
        placeholder="Search…"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}
