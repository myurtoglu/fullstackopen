import React, { useState, useEffect } from 'react'
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchQuery, setSearchQuery ] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchQueryChange = (event) => setSearchQuery(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0) {
      // Person entry with the same name already exists.
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({
        name: newName,
        number: newNumber,
      }))
    }
    setNewName("")
    setNewNumber("")
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(result => setPersons(result.data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchQuery={searchQuery}
        handleSearchQueryChange={handleSearchQueryChange}/>
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={persons} searchQuery={searchQuery}/>
    </div>
  )
}

export default App