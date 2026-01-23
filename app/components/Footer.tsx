"use client"

import { Clapperboard, Drama, Funnel, House, Search, Swords, Tv } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchService } from "../services/searchService";
import { Movie } from "../types/movie";
import { useRouter } from "next/navigation";

export default function Footer() {
    const [open, setOpen]       = useState(false)
    const [query, setQuery]     = useState("")
    const [results, setResults] = useState<Movie[]>([]) 
    const [loading, setLoading] = useState(false)
    const router                = useRouter()
    const searchServie          = new SearchService()
    
    useEffect(() => { 
        if (!query) { 
          setResults([]) 
          return 
        }

        const delayDebounce = setTimeout(async () => { 
          setLoading(true) 
          setResults([])
          const movie = await searchServie.searchMovie(query, "en-US")
          setResults(movie || [])
          setLoading(false)
          }, 500)
        return () => clearTimeout(delayDebounce)
    }, [query])

    return (
        <>
        <div className="fixed left-0 right-0 top-[70px] z-50">
            <div className={open ? 'block md:hidden' : 'hidden'}>
                <div className="relative w-full bg-transparent px-4 py-2">
                    <input 
                    className="flex border-input px-3 py-1 text-sm text-white transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-8 w-full rounded-3xl border-0 bg-black/50 capitalize !text-white placeholder:text-center placeholder:text-gray-500 focus:placeholder:opacity-0 md:h-10 outline-none ring-0 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 shadow-none caret-white pl-[85px]" 
                    placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)}/>
                    <Link href="/search" className="absolute flex cursor-pointer items-center gap-x-2 rounded-xl bg-black px-2 py-1 hover:bg-slate-800 left-5 top-[10px]">
                        <Funnel className="h-3 w-3 text-gray-500"/>
                        <span className="text-sm text-gray-500">Filter</span>
                    </Link>
                    <Search className="absolute h-6 w-6 text-gray-500 right-5 top-3" />
                    {query && (
                    <div className="absolute z-50 mt-2 w-full max-h-[70vh] overflow-auto rounded-xl border border-gray-200 bg-white/95 p-0 shadow-2xl backdrop-blur-md dark:border-gray-700 dark:bg-[#1a1b1e]/95 divide-y divide-gray-200 dark:divide-gray-700 left-0 right-0">
                        {loading && <div className="p-3 text-sm text-gray-500">Loading...</div>}
                        {results.map((movie) => (
                        <Link href={movie.media_type + '/' + movie.id} key={movie.id} className="group flex cursor-pointer items-center gap-3 px-3 py-3 hover:bg-gray-50 dark:hover:bg-[#222225]">
                            <img alt={movie.title} width="48" height="64" className="h-16 w-12 rounded object-cover" 
                            src={movie.poster_path} 
                            loading="lazy" decoding="async"/>
                            <div className="flex flex-col">
                                <span className="text-sm dark:text-white dark:group-hover:text-white">{movie.title}</span>
                                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300">
                                    <span className="capitalize">{movie.media_type}</span>
                                    <span>•</span>
                                    <span className="flex items-center">⭐ {movie.vote_average.toFixed(1)}</span>
                                    <span>•</span>
                                    <span>{movie.release_date?.substring(0, 4)}</span>
                                </div>
                            </div>
                        </Link>
                        ))}
                        <button onClick={() => router.push(`/search?query=${query}&page=1`)} className="w-full rounded-b-xl bg-gray-100 py-3 text-center text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-[#1e2023] dark:text-gray-200 dark:hover:bg-[#26282c]">See more results</button>
                    </div>
                    )}
                </div>
            </div>
        </div>
        <nav className="fixed bottom-0 left-0 right-0 z-[51] bg-white px-4 py-2 text-black dark:bg-black dark:text-white md:hidden">
            <ul className="flex items-center justify-between">
                <li>
                    <Link className="flex flex-col items-center" href="/home">
                        <House />
                        <span className="mt-1 text-xs">Home</span>
                    </Link>
                </li>
                <li>
                    <button onClick={() => setOpen(o => !o)} className="flex flex-col items-center">
                        <Search />
                        <span className="mt-1 text-xs">Search</span>
                    </button>
                </li>
                <li>
                    <Link className="flex flex-col items-center" href="/search?type=movie">
                        <Clapperboard />
                        <span className="mt-1 text-xs">Movies</span>
                    </Link>
                </li>
                <li>
                    <Link className="flex flex-col items-center" href="/search?type=tv">
                        <Tv />
                        <span className="mt-1 text-xs">Series</span>
                    </Link>
                </li>
                <li>
                    <Link className="flex flex-col items-center" href="/search?type=tv">
                        <Swords />
                        <span className="mt-1 text-xs">Anime</span>
                    </Link>
                </li>
                <li>
                    <Link className="flex flex-col items-center" href="/search?type=tv">
                        <Drama />
                        <span className="mt-1 text-xs">Drama</span>
                    </Link>
                </li>
            </ul>
        </nav>
        <footer className="relative mb-12 overflow-hidden pt-10 text-white md:mb-0 z-[50]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/footer-bg2.jpg)" }}>
        </div>
        <div className="relative z-10">
            <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8 py-10 pt-20"><a href="/home">
                    <div className="mb-4 w-full"></div>
                </a>
                <div
                    className="mb-2 flex flex-row items-center justify-center gap-x-5 text-xs sm:flex-row sm:justify-between">
                    <nav className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0"><a
                            className="transition-colors hover:text-red-500" href="/terms">Terms of Service</a><a
                            className="transition-colors hover:text-red-500" href="/privacy-policy">Policy</a><a
                            className="transition-colors hover:text-red-500" href="/faqs">FAQs</a><a
                            className="transition-colors hover:text-red-500" href="/contact">Contact</a></nav>
                    <nav className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0"><a
                            className="transition-colors hover:text-red-500" href="/search?type=movie">Movies</a><a
                            className="transition-colors hover:text-red-500" href="/search?type=tv">Tv shows</a><a
                            className="transition-colors hover:text-red-500" href="/search/anime">Animes</a><a
                            className="transition-colors hover:text-red-500" href="/watchlist">Favorites</a></nav>
                </div>
                <div className="my-4 h-px w-full bg-gradient-to-r from-[#ff5722] via-[#ff7f2a] to-[#ffb02e]"></div>
                <div className="flex flex-col items-center justify-between text-sm md:flex-row">
                    <p
                        className="mx-auto mb-4 max-w-4xl text-center bg-gradient-to-r from-[#ff5722] via-[#ff7f2a] to-[#ffb02e] bg-clip-text text-transparent md:mb-0">
                        xoailac.top is top of free streaming website, where to review movies online free without
                        registration required. With a big database and great features, we're confident. xoailac.top is the
                        best free movies online website in the space that you can't simply miss!</p>
                </div>
                <div className="mt-4 text-center text-xs">
                    <p>This site does not store any files on our server, we only linked to the media which is hosted on
                        3rd party services.</p>
                    <p className="text-gray-400">Vidbox © 2024. All Rights Reserved</p>
                </div>
            </div>
        </div>
    </footer>
    </>
    )
}