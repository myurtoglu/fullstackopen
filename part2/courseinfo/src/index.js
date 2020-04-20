import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  console.log(props)
  const parts = props.course.parts
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}

const Total = (props) => {
  const parts = props.course.parts
  const sum = (accumulator, part) => accumulator + part.exercises
  return <div><b>total of {parts.reduce(sum, 0)} exercises</b></div>
}

const Course = (props) => {
  const course = props.course
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const App = () => {
const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))