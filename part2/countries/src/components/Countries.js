import React from 'react'

const MultipleCountriesEntry = (props) => <div>{props.country.name}</div>

const SingleCountryEntry = (props) => {
  const country = props.country
  return (
    <div>
    <h1>{country.name}</h1>
    capital {country.capital}
    <br />population {country.population}
    <h2>languages</h2>
    <ul>
      {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={country.flag} alt="Flag" width="100"/>
    </div>
  )
}

const Countries = (props) => {
  const countries = props.countries.filter(country =>
    country.name.toLowerCase().includes(props.searchQuery.toLowerCase()))
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    return countries.map(country => <MultipleCountriesEntry key={country.name} country={country} />)
  } else if (countries.length === 1) {
    return countries.map(country => <SingleCountryEntry key={country.name} country={country} />)
  } else {
    return <div>No countries found</div>
  }
}

export default Countries