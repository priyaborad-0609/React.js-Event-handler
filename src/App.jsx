import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {

  const [posts, setposts] = useState([])
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState("")
  const [page, setpage] = useState(1)

  const getDatafromserver = async () => {
    setloading(true)
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`)
      setloading(false)
      setposts(res.data)

    } catch (error) {
      console.log(error.message)
      seterror(error.message)
      setloading(false)
    }

  }
  useEffect(() => {
    getDatafromserver()
  }, [page])
  return loading ? <h1>Loading...</h1> : error ? "Network Error" : (
    <div className='container'>
      <h1><i>Posts are here...</i></h1>
      <hr />
      {posts.map((el) => (
        <div className='card'>
          <p className='id'>{el.id}</p>
          <p className='title'>{el.title}</p>
          <p className='body'>{el.body}</p>
        </div>
      ))}
      <button onClick={() => setpage(page - 1)} disabled={page === 1} >Previous</button>
      <span>{page}</span>
      <button onClick={() => setpage(page + 1)} disabled={page == posts.length}>Next</button>
    </div>
  )
}

export default App