// ex7.2

import { useMatch } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
  let match = useMatch("/anecdotes/:id")
  const anecdote = anecdotes.find(e => e.id === match.params.id)
  console.log("match", match)

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Link: {anecdote.info}</p>
    </div>
  )
}

export default Anecdote