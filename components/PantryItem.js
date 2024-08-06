import React from 'react'
import { Box, Typography, Button } from '@mui/material'

export default function PantryItem({ item, onRemove }) {
  return (
    <Box
      key={item.name}
      width="100%"
      minHeight="150px"
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      bgcolor={'#f0f0f0'}
      paddingX={5}
      mb={2}
    >
      <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </Typography>
      <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
        Quantity: {item.quantity}
      </Typography>
      <Button variant="contained" onClick={() => onRemove(item.name)}>
        Remove
      </Button>
    </Box>
  )
}
