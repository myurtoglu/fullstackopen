import React, { useState, useEffect } from 'react'
import axios from 'axios'

const MultipleCountriesEntry = (props) => {
  const handleShowClicked = (event) => {
    props.handler(props.country)
  }

  return (
    <div>
      {props.country.name}
      <button id={props.country.name} onClick={handleShowClicked}>show</button>
    </div>
  )
}

const Weather = (props) => {
  const city = props.city
  const [ weather, setWeather ] = useState([])

  useEffect(() => {
    const requestString = "http://api.weatherstack.com/current" +
      `?access_key=${process.env.REACT_APP_WEATHER_API_KEY}` +
      `&query=${city}`
    axios
      .get(requestString)
      .then(result => {
        setWeather(result.data.current)
    })
  }, [city])

  return weather.length === 0 ? "" : (
    <div>
    <h2>Weather in {city}</h2>
    <b>temperature:</b> {weather.temperature} Celsius
    <div>
      {weather.weather_icons.map(icon => <img key={icon} src={icon} alt="icon" width="100"/>)}
    </div>
    <b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}
    </div>
  )
}

const SingleCountryEntry = (props) => {
  const country = props.country
  return (
    <div>
    <h1>{country.name}</h1>
    capital {country.capital}
    <br />population {country.population}
    <h2>Spoken languages</h2>
    <ul>
      {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={country.flag} alt="Flag" width="100"/>
    {/* Turned off to save API usage */}
    {/* <Weather city={country.capital} /> */}
    </div>
  )
}

const Countries = (props) => {
  const [ selectedCountry, setSelectedCountry ] = useState([])

  function handleSelectedCountry(country) {
    setSelectedCountry(country)
  }

  if (selectedCountry.length !== 0) {
    return <SingleCountryEntry key={selectedCountry.name} country={selectedCountry} />
  }

  const countries = props.countries.filter(country =>
    country.name.toLowerCase().includes(props.searchQuery.toLowerCase()))

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    return countries.map(country => <MultipleCountriesEntry 
      key={country.name}
      country={country}
      handler={handleSelectedCountry} />)
  } else if (countries.length === 1) {
    return countries.map(country => <SingleCountryEntry key={country.name} country={country} />)
  } else {
    return <div>No countries found</div>
  }
}

export default Countries