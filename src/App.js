import React, { useState, useEffect } from 'react'
import { Routes, Route, useMatch } from "react-router-dom"


import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'

import About from './pages/About'
import CreateNew from './pages/CreateNew'





const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')
  const [anecdote, setAnecdote] = useState('')
  let match = useMatch("/anecdotes/:id")

  useEffect(() => {
    console.log("match", match)
    setAnecdote(match ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id)) : null)
  }, [match, anecdotes])




  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`"${anecdote.content}" created!`)
    setTimeout(() => {
      setNotification('')
    }, 3000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <div>{notification ? <div style={{ boxShadow: "0 0 0 2px green", padding: 10 }}>{notification}</div> : <div style={{ padding: 10 }}>&nbsp;</div>}</div>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/" exact element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App;