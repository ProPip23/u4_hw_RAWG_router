import GenreCard from '../components/GenreCard'
import { BASE_URL, API_KEY } from '../globals'
import GameCard from '../components/GameCard'
import { useEffect, useState } from 'react'
import Search from '../components/Search'
import axios from 'axios'
import { Link } from 'react-router-dom'

//Component named Home with a useState hook declaring 4 pieces of state.Initial useState is set to blank
const Home = () => {
  const [genres, setGenres] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searched, toggleSearched] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const getGenres = async () => {
      const response = await axios.get(`${BASE_URL}/genres?key=${API_KEY}`)
      setGenres(response.data.results)
    }
    getGenres()
  }, [])

  const getSearchResults = async (e) => {
    e.preventDefault()
    const response = await axios.get(
      `${BASE_URL}/games?search=${searchQuery}&key=${API_KEY}`
    )
    console.log(response)
    setSearchResults(response.data.results)
    setSearchQuery('')
    toggleSearched(true)
  }

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div>
      <div className="search">
        {/* calling the props from Search.jsx */}
        <Search
          value={searchQuery}
          onChange={handleChange}
          onSubmit={getSearchResults}
        />
        <h2>Search Results</h2>
        <section className="search-results container-grid">
          {searched &&
            searchResults.map((result) => (
              <Link to={`/games/details/${result.id}`} key={result.id}>
                {/* Calling the props from GameCard.jsx  */}
                <GameCard
                  key={result.id}
                  game={result}
                  // 
                  image={result.background_image}
                  name={result.name}
                  rating={result.rating}
                />
              </Link>
            ))}
        </section>
      </div>
      <div className="genres">
        <h2>Genres</h2>
        <section className="container-grid">
          {genres.map((genre) => (
            // calling the props from GenreCard.jsx
            <GenreCard
              key={genre.id}
              genre={genre}
              image={genre.image_background}
              name={genre.name}
            />
          ))}
        </section>
      </div>
    </div>
  )
}

export default Home
