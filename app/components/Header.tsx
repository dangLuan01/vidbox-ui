"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SearchService } from "../services/searchService"
import { Movie } from "../types/movie"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, } from "@/components/ui/dropdown-menu"
import { Clapperboard, Film, Home, Menu, MoonStar, Search, Sun } from "lucide-react"

export default function Header() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const [query, setQuery]     = useState("") 
  const [results, setResults] = useState<Movie[]>([]) 
  const [loading, setLoading] = useState(false)
  const searchServie          = new SearchService()

  const [theme, setTheme] = useState<"light" | "dark">(() =>{
    if (typeof window !== "undefined") { 
      return (
        localStorage.getItem("theme") as "light" | "dark") || 
        "light" 
      } 

    return "light"
  })

  const toggleTheme = () => { 
    setTheme(theme === "light" ? "dark" : "light")
  }

  useEffect(() => { 

    if (theme === "dark") { 
      document.documentElement.classList.add("dark") 
    } else { 
      document.documentElement.classList.remove("dark") 
    } 

    localStorage.setItem("theme", theme) 

    if (!query) { 
      setResults([]) 
      return 
    } 
    const delayDebounce = setTimeout(async () => { 
      setLoading(true) 
      const movie = await searchServie.searchMovie(query, "en-US")
      setResults(movie || [])
      setLoading(false)
      }, 500)
    return () => clearTimeout(delayDebounce)
  }, [query, theme])
  
  return (
    <header className="absolute top-0 z-[100] w-full pt-5">
      <div className="mx-auto flex items-center justify-between max-w-[1440px] px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link className="text-2xl font-bold text-red-500" href="/home">
          <img alt="logo" width="150" height="36" src="/logo.png" />
        </Link>

        {/* Search Box */}
        <div className="hidden md:block">
          <div className="relative hidden md:block">
            <input
              className="flex border-input px-3 py-1 text-sm text-white transition-colors 
                        file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground 
                        focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 
                        h-8 w-full rounded-3xl border-0 bg-black/50 capitalize !text-white 
                        placeholder:text-center placeholder:text-gray-500 focus:placeholder:opacity-0 
                        md:h-10 outline-none ring-0 focus:outline-none focus-visible:outline-none 
                        focus:ring-0 focus-visible:ring-0 shadow-none caret-white pl-[85px] 
                        sm:w-64 md:w-72 lg:w-[450px]"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* Filter Button */}
            <Link href="/search" className="absolute left-2 top-[6px] flex cursor-pointer items-center gap-x-2 
                              rounded-xl bg-black px-2 py-1 hover:bg-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="lucide lucide-filter h-3 w-3 text-gray-500">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              <span className="text-sm text-gray-500">Filter</span>
            </Link>

            {/* Search Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-search absolute right-2 top-2 h-6 w-6 text-gray-500">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            {/* Kết quả tìm kiếm */}
            {query && (
            <div className="absolute z-50 mt-2 w-full max-h-[70vh] overflow-auto rounded-xl border border-gray-200 bg-white/95 p-0 shadow-2xl backdrop-blur-md dark:border-gray-700 dark:bg-[#1a1b1e]/95 divide-y divide-gray-200 dark:divide-gray-700">
              {loading && <div className="p-3 text-sm text-gray-500">Loading...</div>}
              {results.map((movie) => (
                <Link key={movie.id} href={`/${movie.media_type}/${movie.id}`} className="group flex cursor-pointer items-center gap-3 px-3 py-3 hover:bg-gray-50 dark:hover:bg-[#222225]">
                 <img alt={movie.title} width="48" height="64" className="h-16 w-12 rounded object-cover" src={movie.poster_path}/>
                 <div className="flex flex-col">
                    <span className="text-sm dark:text-white dark:group-hover:text-white">{movie.title}</span>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300">
                      <span className="capitalize">{movie.media_type}</span>
                      <span>•</span>
                      <span className="flex items-center">⭐ {movie.vote_average.toFixed(1) ?? "0.0"}</span>
                      <span>•</span>
                      <span>{movie.release_date ?? ""}</span>
                    </div>
                 </div>
              </Link>
              ))}
              <button className="w-full rounded-b-xl bg-gray-100 py-3 text-center text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-[#1e2023] dark:text-gray-200 dark:hover:bg-[#26282c]">See more results</button>
            </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-x-2">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="inline-flex items-center justify-center whitespace-nowrap rounded-md 
                            text-sm font-medium transition-colors focus-visible:outline-none 
                            focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none 
                            disabled:opacity-50 hover:bg-transparent h-9 w-9 bg-transparent">
            {!mounted ? ( 
              <div className="h-6 w-6" /> 
            ) : theme === "dark" ? ( <MoonStar /> ) : ( <Sun /> )}
          </button>

          {/* Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-white/10">
                <Menu />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <Link href="/home" className="flex items-center gap-2">
                  <Home />
                  Home
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/search" className="flex items-center gap-2">
                  <Search />
                  Search
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/search?type=movie" className="flex items-center gap-2">
                <Clapperboard />
                  Movies
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/search?type=tv" className="flex items-center gap-2">
                <Film />
                  TV Shows
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
