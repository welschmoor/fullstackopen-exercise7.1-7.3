

import { Link, useParams } from "react-router-dom"


const AnecdoteList = ({ anecdotes }) => {
  const { id } = useParams()


  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => {

          return (
            <Link to={`anecdotes/${anecdote.id}`} key={anecdote.id}>
              <li  >
                {anecdote.content}
              </li>
            </Link>
          )
        }
        )}
      </ul>
    </div>
  )
}


export default AnecdoteList