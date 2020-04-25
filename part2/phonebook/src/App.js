import React, { useState } from 'react'

const Numbers = ({ persons }) => {
  return persons.map(
    person => <div key={person.name}>{person.name}</div>)
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNoteChange = (event) => setNewName(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0) {
      // Person entry with the same name already exists.
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({
        name: newName,
      }))
    }
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons}/>
    </div>
  )
}

export default App