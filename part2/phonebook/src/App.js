import React, { useState, useEffect } from 'react'
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import phonebook from "./services/phonebook"

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchQuery, setSearchQuery ] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchQueryChange = (event) => setSearchQuery(event.target.value)
  const remove = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name} ?`)) { 
      phonebook
        .remove(personToDelete.id)
        .then(setPersons(
          persons.filter(person => personToDelete.id !== person.id))
      )
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0) {
      // Person entry with the same name already exists.
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      phonebook
        .create(newPerson)
        .then(newPerson => setPersons(persons.concat(newPerson)))
    }
    setNewName("")
    setNewNumber("")
  }

  useEffect(() => {
    phonebook.getAll().then(persons => setPersons(persons))
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
      <Persons persons={persons} searchQuery={searchQuery} remove={remove}/>
    </div>
  )
}

export default App