import React from 'react'

const Person = ({ person }) => <div>{person.name} {person.number}</div>

const Persons = ({ persons, searchQuery }) => {
  return persons
    .filter(
      person => person.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(
      person => <Person key={person.name} person={person} />)
}

export default Persons