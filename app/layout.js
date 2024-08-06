'use client'

import React from 'react'
import Navbar from '@/components/Navbar'
import SearchBar from '@/components/SearchBar'
import { useState } from 'react'

export default function Layout({ children }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  return (
    <div>
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      <main>{React.cloneElement(children, { searchTerm })}</main>
    </div>
  )
}
