"use client"

import { useEffect, useState } from "react"
import { SearchService } from "../services/searchService"
import { Movie } from "../types/movie"
import Link from "next/link"

export default function Header() {
  const [query, setQuery] = useState("") 
  const [results, setResults] = useState<Movie[]>([]) 
  const [loading, setLoading] = useState(false)
  const searchServie = new SearchService()

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
        <a className="text-2xl font-bold text-red-500" href="/home">
          <img alt="logo" width="150" height="36" src="/logo.png" />
        </a>

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
            <button className="absolute left-2 top-[6px] flex cursor-pointer items-center gap-x-2 
                              rounded-xl bg-black px-2 py-1 hover:bg-slate-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="lucide lucide-filter h-3 w-3 text-gray-500">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              <span className="text-sm text-gray-500">Filter</span>
            </button>

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
          
          {/* Smartphone Link */}
          <a href="/android-movies-apk">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-smartphone text-white">
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
              <path d="M12 18h.01"></path>
            </svg>
          </a>

          {/* Download App */}
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md 
                            text-sm font-medium focus-visible:outline-none focus-visible:ring-1 
                            focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 
                            hover:bg-transparent h-9 w-9 bg-transparent hover:text-white 
                            transition-all duration-200 text-white"
                  title="Download APP">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-download">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" x2="12" y1="15" y2="3"></line>
            </svg>
          </button>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="inline-flex items-center justify-center whitespace-nowrap rounded-md 
                            text-sm font-medium transition-colors focus-visible:outline-none 
                            focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none 
                            disabled:opacity-50 hover:bg-transparent h-9 w-9 bg-transparent">
            {theme ==="light" ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-sun text-white">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
            ):(
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-moon text-black dark:text-white"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>  
            )}

          </button>

          {/* Menu */}
          <button type="button" id="radix-_r_0_" aria-haspopup="menu" aria-expanded="false"
                  data-state="closed">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-menu text-white">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>

          {/* User Icon */}
          <div>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md 
                              text-sm font-medium transition-colors focus-visible:outline-none 
                              focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none 
                              disabled:opacity-50 hover:bg-transparent h-9 w-9 text-white bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="lucide lucide-user text-white">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
