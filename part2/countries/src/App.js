import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ countries, setCountries ] = useState([])

  const handleSearchQueryChange = (event) => setSearchQuery(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(result => setCountries(result.data))
  }, [])

  return (
    <div>
      find countries
      <input value={searchQuery} onChange={handleSearchQueryChange} />
      <Countries countries={countries} searchQuery={searchQuery} />
    </div>
  )
}

export default App