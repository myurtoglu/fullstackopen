import React from 'react'

const Person = ({ person, handleDelete }) => (
  <div>{person.name} {person.number} <button onClick={handleDelete}>delete</button></div>
)

const Persons = ({ persons, searchQuery, remove }) => {
  return persons
    .filter(
      person => person.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(
      person =>
        <Person key={person.name}
                person={person}
                handleDelete={() => remove(person)}
        />
    )
}

export default Persons