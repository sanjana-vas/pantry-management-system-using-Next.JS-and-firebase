'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField, IconButton } from '@mui/material'
import { firestore, auth } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { useAuthState } from 'react-firebase-hooks/auth'
import Link from 'next/link'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default function Home() {
  const [inventory, setInventory] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredInventory, setFilteredInventory] = useState<any[]>([])
  const [user] = useAuthState(auth)

  const fetchInventory = async () => {
    if (user) {
      const snapshot = query(collection(firestore, 'inventory'))
      const docs = await getDocs(snapshot)
      const inventoryList = docs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setInventory(inventoryList)
      setFilteredInventory(inventoryList)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [user])

  useEffect(() => {
    setFilteredInventory(
      inventory.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }, [searchQuery, inventory])

  const addItem = async (item: string, quantity: number) => {
    if (user) {
      const docRef = doc(collection(firestore, 'inventory'), item)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const existingData = docSnap.data()
        await setDoc(docRef, { ...existingData, quantity: existingData.quantity + quantity })
      } else {
        await setDoc(docRef, { name: item, quantity })
      }
      await fetchInventory() // Ensure inventory is fetched after adding item
    }
  }

  const removeItem = async (item: string) => {
    if (user) {
      const docRef = doc(collection(firestore, 'inventory'), item)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { quantity } = docSnap.data()
        if (quantity === 1) {
          await deleteDoc(docRef)
        } else {
          await setDoc(docRef, { quantity: quantity - 1 })
        }
      }
      await fetchInventory() // Ensure inventory is fetched after removing item
    }
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" alignItems="center" bgcolor="#fafafa">
      {user ? (
        <>
          <Box width="100%" p={2} display="flex" justifyContent="space-between" alignItems="center" bgcolor="#333" color="#fff">
            <Typography variant="h6">Pantry Inventory</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                variant="outlined"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon />,
                }}
              />
              <IconButton color="primary" onClick={handleOpen}>
                <AddIcon />
              </IconButton>
              <Button variant="contained" color="secondary" onClick={handleSignOut}>
                Sign Out
              </Button>
            </Stack>
          </Box>
          <Box width="100%" p={2}>
            <Stack spacing={2}>
              {filteredInventory.map((item) => (
                <Box
                  key={item.id}
                  p={2}
                  bgcolor="#fff"
                  borderRadius="8px"
                  boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1">Quantity: {item.quantity}</Typography>
                  <Button variant="contained" color="error" onClick={() => removeItem(item.id)}>
                    Remove
                  </Button>
                </Box>
              ))}
            </Stack>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Item
              </Typography>
              <Stack width="100%" direction="column" spacing={2}>
                <TextField
                  id="outlined-basic"
                  label="Item Name"
                  variant="outlined"
                  fullWidth
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Quantity"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(parseInt(e.target.value))}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    addItem(itemName, itemQuantity)
                    setItemName('')
                    setItemQuantity(1)
                    handleClose()
                  }}
                >
                  Add
                </Button>
              </Stack>
            </Box>
          </Modal>
        </>
      ) : (
        <Box>
          <Link href="/signin">Sign In</Link> | <Link href="/signup">Sign Up</Link>
        </Box>
      )}
    </Box>
  )
}
