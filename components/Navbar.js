import React from 'react'
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: 'brown' }}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Pantry Management
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <SearchIcon />
          <InputBase
            placeholder="Search…"
            sx={{ ml: 1, color: 'inherit', width: '100%' }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
