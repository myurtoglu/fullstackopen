import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, title }) =>
  <button onClick={handleClick}>{title}</button>

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
    <h1>statistics</h1>
    <p>
      good {good}
      <br />neutral {neutral}
      <br />bad {bad}
    </p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)