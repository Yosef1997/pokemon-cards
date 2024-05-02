import { useEffect, useState } from "react"
import PokemonContext, { Pokemon, PokemonContextType } from "./PokemonContext"

export const PokemonProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [gridValue, setGridValue] = useState<number>(2)
  const [sortBy, setSortbyQuery] = useState<string>("Sort by")

  const MAX_FETCH_DATA = 10000
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true)
        const storeGridValue = localStorage.getItem("gridValue")
        if (storeGridValue && storeGridValue.length > 0) {
          const parsedData: string = JSON.parse(storeGridValue)
          setGridValue(Number.parseInt(parsedData))
        }

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${
            searchQuery ? MAX_FETCH_DATA : 20
          }`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon.")
        }
        const data = (await response.json()) as { results: Pokemon[] }

        // Do filtering based on the query string
        let filteredResults = data.results
        if (searchQuery) {
          const regex = new RegExp(searchQuery, "i") // Case-insensitive regex
          filteredResults = data.results.filter((pokemon) =>
            regex.test(pokemon.name)
          )
        }
        const cappedResults = filteredResults.slice(0, 20) // Cap the results to max 20 items
        setPokemonList(cappedResults)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchPokemonList()
  }, [searchQuery])

  const value: PokemonContextType = {
    pokemonList,
    loading,
    error,
    setSearchQuery,
    searchQuery,
    setGridValue,
    gridValue,
    setSortbyQuery,
    sortBy,
  }

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  )
}
