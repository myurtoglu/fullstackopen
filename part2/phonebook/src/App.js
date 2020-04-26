import React, { useState, useEffect } from 'react'
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import phonebook from "./services/phonebook"

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ message, setMessage ] = useState(null)

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
    const filteredPersons = persons.filter(person => person.name === newName)
    if (filteredPersons.length > 0) {
      // Person entry with the same name already exists, update their number.
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`)
      ) {
        const filteredPerson = filteredPersons[0]
        phonebook
          .update(filteredPerson.id, { ...filteredPerson, number: newNumber})
          .then(updatedPerson => {
            setPersons(
              persons.map(person => person.id === filteredPerson.id ? updatedPerson : person))
            setMessage(`${newName}'s phone number updated to ${newNumber}`)
            setTimeout(() => setMessage(null), 5000)
          })
      } 
    } else {
      const newPerson = { name: newName, number: newNumber }
      phonebook
        .create(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setMessage(`Added ${newPerson.name}`)
          setTimeout(() => setMessage(null), 5000)
        })
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
      <Notification message={message} />
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