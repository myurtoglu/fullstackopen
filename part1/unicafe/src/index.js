import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, title }) =>
  <button onClick={handleClick}>{title}</button>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) / all
  const positivePercent = all === 0  ? 0 : good / all * 100

  let result
  if (all === 0) {
    result = "No feedback given"
  } else {
    result = (
      <div>
        good {good}
        <br />neutral {neutral}
        <br />bad {bad}
        <br />all {all}
        <br />average {average}
        <br />positive {positivePercent} %
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      {result}
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
    <h1>give feedback</h1>
      <Button handleClick={() => {setGood(good + 1)}} title="good"/>
      <Button handleClick={() => {setNeutral(neutral + 1)}} title="neutral"/>
      <Button handleClick={() => {setBad(bad + 1)}} title="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)