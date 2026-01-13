"use client"

import { Popover, PopoverTrigger, PopoverContent, } from "@/components/ui/popover" 
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "@/components/ui/command" 
import { ChevronDown } from "lucide-react"

import { Genre } from "../types/genre"
import { useEffect, useState } from "react"
import { Provider } from "../types/provider"
import { Country } from "../types/country"
import { Filters } from "../types/filter"
import { MovieFilter } from "../types/movie"
import { SearchService } from "../services/searchService"
import { populars, types } from "../data/filters"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
const searchService     = new SearchService()

export default function FilterSearch({genres, networks, countries}: { 
    genres: Genre[], networks: Provider[], countries: Country[],
}) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [openType, setOpenType]       = useState(false) 
    const [openGenre, setOpenGenre]     = useState(false) 
    const [openPopular, setOpenPopular] = useState(false) 
    const [openNetwork, setOpenNetwork] = useState(false) 
    const [openYear, setOpenYear]       = useState(false) 
    const [openCountry, setOpenCountry] = useState(false) 
    const [openRating, setOpenRating]   = useState(false) 
    const [movies, setMovies]           = useState<MovieFilter | null>({
        movies: null,
        page: 1,
        limit: 20,
        total_pages: 0
    })
    const ratings   = ["9", "8", "7", "6", "5"]
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => currentYear - i)
   
    const page = Number(searchParams.get("page")) || 1
    const [filters, setFilters] = useState<Filters>({
        query: searchParams.get("query") ?? null,
        typeId: searchParams.get("type") ?? "movie",
        typeName: "Type",
        genreId: searchParams.get("genre") ? Number(searchParams.get("genre")) : null,
        genreName: "All genres",
        popularId: searchParams.get("popular"),
        popularName: "Popular",
        networkId: searchParams.get("network") ? Number(searchParams.get("network")) : null,
        networkName: "Select network",
        year: searchParams.get("year") ?? "Years",
        countryId: searchParams.get("country"),
        countryName: "Country", 
        rating: searchParams.get("rating") ?? "Ratings", 
    })

    function onSearch(query: string | null) {
        const params = new URLSearchParams(searchParams.toString())

        if (query) {
            params.set("query", query)
        } else {
            params.delete("query")
        }

        params.set("page", "1")

        router.push(`?${params.toString()}`)
    }

    function onSelectType(typeId: string | null) {
        const params = new URLSearchParams(searchParams.toString())

        if (typeId) {
            params.set("type", typeId)
        } else {
            params.delete("type")
        }

        params.set("page", "1") 

        router.push(`?${params.toString()}`)
    }

    function onSelectGenre(genreId: number | null) {
        const params = new URLSearchParams(searchParams.toString())

        if (genreId) {
            params.set("genre", genreId.toString())
        } else {
            params.delete("genre")
        }

        params.set("page", "1")

        router.push(`?${params.toString()}`)
    }

    function onSelectPopular(popularId: string | null) {
        const params = new URLSearchParams(searchParams.toString())

        if (popularId) {
            params.set("popular", popularId)
        } else {
            params.delete("popular")
        }

        params.set("page", "1") 

        router.push(`?${params.toString()}`)
    }

    function onSelectYear(year: string | null) {
        const params = new URLSearchParams(searchParams.toString())

        if (year) {
            params.set("year", year)
        } else {
            params.delete("year")
        }

        params.set("page", "1")

        router.push(`?${params.toString()}`)
    }

    function onSelectCountry(countryId: string | null) {
        const params = new URLSearchParams(searchParams.toString())

        if (countryId) {
            params.set("country", countryId)
        } else {
            params.delete("country")
        }

        params.set("page", "1")

        router.push(`?${params.toString()}`)
    }

    function onSelectNetwork(networkId: string | null) {
        const params = new URLSearchParams(searchParams.toString())

        if (networkId) {
            params.set("network", networkId)
        } else {
            params.delete("network")
        }

        params.set("page", "1")

        router.push(`?${params.toString()}`)
    }

    function onSelectRating(rating: string | null) {
        const params = new URLSearchParams(searchParams.toString())

        if (rating) {
            params.set("rating", rating)
        } else {
            params.delete("rating")
        }

        params.set("page", "1")

        router.push(`?${params.toString()}`)
    }

    function goToPage(p: number) {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", p.toString())
        router.push(`?${params.toString()}`)
    }

    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            query: searchParams.get("query")
            ? searchParams.get("query")
            : null,
            genreId: searchParams.get("genre")
            ? Number(searchParams.get("genre"))
            : null,
            genreName: searchParams.get("genre")
            ? genres.find(g => g.id === Number(searchParams.get("genre")) )?.name ?? "All genres"
            : "All genres",
            typeId: searchParams.get("type")
            ? searchParams.get("type")
            : null,
            typeName: searchParams.get("type")
            ? types.find(t => t.value === searchParams.get("type"))?.name ?? "Type"
            : "Type",
            popularId: searchParams.get("popular")
            ? searchParams.get("popular")
            : null,
            popularName: searchParams.get("popular")
            ? populars.find(p => p.value === searchParams.get("popular"))?.name ?? "Popular"
            : "Popular",
            year: searchParams.get("year")
            ? searchParams.get("year")
            : null,
            countryId: searchParams.get("country")
            ? searchParams.get("country")
            : null,
            countryName: searchParams.get("country")
            ? countries.find(c => c.iso_3166_1 === searchParams.get("country"))?.english_name ?? "Country"
            : "Country",
            networkId: searchParams.get("network")
            ? Number(searchParams.get("network"))
            : null,
            networkName: searchParams.get("network")
            ? networks.find(n => n.provider_id === Number(searchParams.get("network")))?.provider_name ?? "Network"
            : "Network",
            rating: searchParams.get("rating")
            ? searchParams.get("rating")
            : null,
        }))
    }, [searchParams])

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null
        setMovies(prev => {
            if (!prev) {
                return {
                    movies: null,
                    page: 1,
                    total_pages: 0,
                    limit: 20,
                }
            }
            return {
                ...prev,
                movies: null,
            }
        })

        async function fetchFilter () {  
            const moviesFilter = await searchService.getFilterMovie(filters, page)
            setMovies(moviesFilter) 
        }
        if (filters.query) {
            timeout = setTimeout(() => {
                fetchFilter()
            }, 700)
        } else {
            fetchFilter()
        }
        
        return () => { 
            if (timeout) clearTimeout(timeout) 
        }
    },[page, filters])

    function getPagination(current: number, total: number) {
        const delta = 2
        const range = []
        const rangeWithDots = []
        let l

        for (let i = 1; i <= total; i++) {
            if (
            i === 1 ||
            i === total ||
            (i >= current - delta && i <= current + delta)
            ) {
            range.push(i)
            }
        }

        for (const i of range) {
            if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1)
            } else if (i - l !== 1) {
                rangeWithDots.push("...")
            }
            }
            rangeWithDots.push(i)
            l = i
        }

        return rangeWithDots
    }

    const [searchText, setSearchText] = useState("")
    useEffect(() => {
    const timeout = setTimeout(() => {
        onSearch(searchText)
    }, 500)

    return () => clearTimeout(timeout)
    }, [searchText])

    
    return (
        <>
        <div className="flex flex-col gap-4">
            <input className="flex h-9 border border-input bg-transparent px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-lg py-4 capitalize text-black dark:text-white outline-none ring-0 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 caret-white" 
            placeholder="Search..." autoComplete="off" autoCorrect="off" spellCheck="false" value={filters.query ?? ""}
            onChange={(e) =>{
                const value = e.target.value
                onSearch(value)
            }}/>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:flex xl:items-center xl:gap-0 xl:space-x-2">
                    {/* Type */}
                    <Popover open={openType} onOpenChange={setOpenType}> 
                        <PopoverTrigger asChild> 
                            <button type="button" role="combobox" aria-expanded={openType} className="flex h-10 items-center justify-between rounded-md border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-full xl:w-[180px] bg-[#f3f4f6] dark:bg-[#2a2a30] border-0" > 
                                <span style={{ pointerEvents: "none" }}>
                                    {filters.typeName}
                                </span> 
                                <ChevronDown className="h-4 w-4 opacity-50" /> 
                            </button> 
                        </PopoverTrigger> 
                        <PopoverContent className="w-[180px] p-0"> 
                            <Command> 
                                <CommandGroup>
                                    {types.map((type) => ( 
                                        <CommandItem key={type.value} onSelect={() => {
                                            onSelectType(type.value)
                                            // setPage(1)
                                            setOpenType(false) 
                                        }} > {type.name} 
                                        </CommandItem> 
                                    ))} 
                                </CommandGroup> 
                            </Command> 
                        </PopoverContent> 
                    </Popover>
                    {/* Genres */}
                    <Popover open={openGenre} onOpenChange={setOpenGenre}> 
                        <PopoverTrigger asChild> 
                            <button type="button" role="combobox" aria-expanded={openGenre} className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full xl:w-[180px] justify-between bg-[#f3f4f6] dark:bg-[#2a2a30] border-0" > 
                                {filters.genreName} 
                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> 
                            </button> 
                        </PopoverTrigger> 
                        <PopoverContent className="w-[200px] p-0 max-h-60 overflow-y-auto"> 
                            <Command> 
                                <CommandInput placeholder="Search genre..." /> 
                                <CommandEmpty>
                                    No genre found.
                                </CommandEmpty> 
                                <CommandGroup> 
                                    <CommandItem onSelect={() => {
                                        onSelectGenre(null)
                                        setOpenGenre(false) 
                                    }} > All genres
                                    </CommandItem>
                                    {genres.map((genre) => ( 
                                    <CommandItem key={genre.id} value={genre.name} onSelect={() => {
                                        onSelectGenre(genre.id)
                                        setOpenGenre(false) 
                                    }} > {genre.name}
                                    </CommandItem> ))} 
                                </CommandGroup> 
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {/* Popular */}
                    <Popover open={openPopular} onOpenChange={setOpenPopular}> 
                        <PopoverTrigger asChild> 
                            <button type="button" role="combobox" aria-expanded={openPopular} className="flex h-10 items-center justify-between rounded-md border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-full xl:w-[180px] bg-[#f3f4f6] dark:bg-[#2a2a30] border-0" > 
                                <span style={{ pointerEvents: "none" }}>
                                    {filters.popularName}
                                </span> 
                                <ChevronDown className="h-4 w-4 opacity-50" /> 
                            </button> 
                        </PopoverTrigger> 
                        <PopoverContent className="w-[180px] p-0"> 
                            <Command> 
                                <CommandGroup> 
                                    {populars.map((popular) => ( 
                                        <CommandItem key={popular.value} onSelect={() => { 
                                            onSelectPopular(popular.value)
                                            setOpenPopular(false) 
                                        }} > {popular.name} 
                                        </CommandItem> 
                                    ))} 
                                </CommandGroup> 
                            </Command> 
                        </PopoverContent> 
                    </Popover>
                    {/* Year */}
                    <Popover open={openYear} onOpenChange={setOpenYear}> 
                        <PopoverTrigger asChild> 
                            <button type="button" role="combobox" aria-expanded={openYear} className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full xl:w-[180px] justify-between bg-[#f3f4f6] dark:bg-[#2a2a30] border-0" > 
                                {filters.year ? filters.year : "Years"}
                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> 
                            </button> 
                        </PopoverTrigger> 
                        <PopoverContent className="w-[200px] p-0 max-h-60 overflow-y-auto"> 
                            <Command> 
                                <CommandInput placeholder="Search year..." /> 
                                <CommandEmpty>
                                    No year found.
                                </CommandEmpty> 
                                <CommandGroup> 
                                    <CommandItem onSelect={() => {
                                        onSelectYear(null)
                                        setOpenYear(false) 
                                    }} > Years
                                    </CommandItem>
                                    {years.map((year) => ( 
                                    <CommandItem key={year} value={year.toString()} onSelect={() => {
                                        onSelectYear(year.toString())
                                        setOpenYear(false) 
                                    }} > {year}
                                    </CommandItem> ))} 
                                </CommandGroup> 
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {/* Network */}
                    <Popover open={openNetwork} onOpenChange={setOpenNetwork}> 
                        <PopoverTrigger asChild> 
                            <button type="button" role="combobox" aria-expanded={openNetwork} className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full xl:w-[180px] justify-between bg-[#f3f4f6] dark:bg-[#2a2a30] border-0" > 
                                {filters.networkName} 
                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> 
                            </button> 
                        </PopoverTrigger> 
                        <PopoverContent className="w-[200px] p-0 max-h-60 overflow-y-auto"> 
                            <Command> 
                                <CommandInput placeholder="Search network..." /> 
                                <CommandEmpty>
                                    No network found.
                                </CommandEmpty> 
                                <CommandGroup> 
                                    <CommandItem onSelect={() => {
                                        onSelectNetwork(null)
                                        setOpenNetwork(false)
                                    }} > Networks
                                    </CommandItem>
                                    {networks.map((network) => ( 
                                    <CommandItem key={network.provider_id} value={network.provider_name} onSelect={() => {
                                        onSelectNetwork(network.provider_id.toString())
                                        setOpenNetwork(false)
                                    }} > {network.provider_name}
                                    </CommandItem> ))} 
                                </CommandGroup> 
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {/* Country */}
                    <Popover open={openCountry} onOpenChange={setOpenCountry}> 
                        <PopoverTrigger asChild> 
                            <button type="button" role="combobox" aria-expanded={openCountry} className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-input shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full xl:w-[180px] justify-between bg-[#f3f4f6] dark:bg-[#2a2a30] border-0" > 
                                {filters.countryName} 
                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> 
                            </button> 
                        </PopoverTrigger> 
                        <PopoverContent className="w-[200px] p-0 max-h-60 overflow-y-auto"> 
                            <Command> 
                                <CommandInput placeholder="Search country..." /> 
                                <CommandEmpty>
                                    No country found.
                                </CommandEmpty> 
                                <CommandGroup> 
                                    <CommandItem value="" onSelect={() => { 
                                        
                                        onSelectCountry(null)
                                        setOpenCountry(false) 
                                    }} > Country
                                    </CommandItem> 
                                    {countries.map((country) => ( 
                                    <CommandItem key={country.iso_3166_1} value={country.english_name} onSelect={() => {
                                        onSelectCountry(country.iso_3166_1)
                                        setOpenCountry(false) 
                                    }} > {country.english_name}
                                    </CommandItem> ))} 
                                </CommandGroup> 
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {/* Rating */}
                    <Popover open={openRating} onOpenChange={setOpenRating}> 
                        <PopoverTrigger asChild> 
                            <button type="button" role="combobox" aria-expanded={openRating} className="flex h-10 items-center justify-between rounded-md border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 w-full xl:w-[180px] bg-[#f3f4f6] dark:bg-[#2a2a30] border-0" > 
                                <span style={{ pointerEvents: "none" }}>
                                    {filters.rating ?? "Rating"}
                                </span> 
                                <ChevronDown className="h-4 w-4 opacity-50" /> 
                            </button> 
                        </PopoverTrigger>
                        <PopoverContent className="w-[180px] p-0"> 
                            <Command>
                                <CommandGroup> 
                                    <CommandItem value="" onSelect={() => { 
                                        onSelectRating(null)
                                        setOpenRating(false) 
                                    }} > Rating
                                    </CommandItem> 
                                    {ratings.map((rating) => (
                                        <CommandItem key={rating} value={rating} onSelect={() => { 
                                           
                                        onSelectRating(rating)
                                        setOpenRating(false) 
                                        }} > {`${rating} + ⭐`}
                                        </CommandItem> 
                                    ))} 
                                </CommandGroup> 
                            </Command> 
                        </PopoverContent> 
                    </Popover>
                    <button className="flex items-center justify-center gap-x-2 rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                        Reset
                    </button>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {movies?.movies?.length === 0 && ( <p className="text-gray-500 ">No results found</p> )} 
            {movies?.movies?.map((movie) => (
            <div className="relative overflow-hidden rounded-md hover:text-white aspect-[2/3]">
                <Link href={`/${filters.typeId === "movie" ? "movie" : "tv"}/${movie.id}`}>
                    <div className="relative rounded-sm w-full h-full">
                    <img className="transition-opacity duration-300 opacity-100" alt="The Tank" width="300" height="450" style={{objectFit: "cover"}} 
                    src={movie.poster_path} />
                    <button className="absolute top-2 left-0.5 z-10 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-110 active:scale-95 bg-black/50 text-white/70 hover:bg-blue-500/50 hover:text-white" aria-label="Add to watchlist">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bookmark-plus h-5 w-5">
                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                            <line x1="12" x2="12" y1="7" y2="13"></line>
                            <line x1="15" x2="9" y1="10" y2="10"></line>
                        </svg>
                    </button>
                    <div className="absolute right-0 top-2 flex gap-1 rounded-l bg-black bg-opacity-50 pl-1 text-xs font-semibold text-white">
                        <svg className="h-4 w-4 fill-yellow-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                        </svg>
                        {movie.vote_average.toFixed(1)}
                    </div>
                    </div>
                </Link>
            </div>
            ))}
        </div>
        <nav className="mt-12 mx-auto w-full" aria-label="Pagination">
            <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8">
                <div className="flex justify-center  justify-center px-2">
                    <div className="inline-flex items-center gap-1 sm:gap-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-1 sm:p-2 shadow-lg max-w-full overflow-hidden">
                            {/* First */}
                            <button className="flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 dark:disabled:hover:bg-gray-700"
                                disabled={page === 1}
                                onClick={() => goToPage(1)} aria-label="First page">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-left h-2.5 w-2.5 sm:h-4 sm:w-4">
                                    <path d="m15 18-6-6 6-6"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-left h-2.5 w-2.5 sm:h-4 sm:w-4 -ml-0.5 sm:-ml-2">
                                    <path d="m15 18-6-6 6-6"></path>
                                </svg>
                            </button>

                            {/* Prev */}
                            <button className="flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 dark:disabled:hover:bg-gray-700"
                                disabled={page === 1}
                                onClick={() => goToPage(page - 1)}  aria-label="Previous page">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-left h-2.5 w-2.5 sm:h-4 sm:w-4">
                                    <path d="m15 18-6-6 6-6"></path>
                                </svg>
                            </button>

                            {/* Pages */}
                            <div className="flex items-center gap-1 overflow-visible">
                            {movies &&
                                getPagination(page, movies.total_pages).map((p, i) =>
                                p === "..." ? (
                                    <span key={i} className="px-1 sm:px-2 py-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">…</span>
                                ) : (
                                    <button
                                    key={i}
                                    onClick={() => goToPage(p as number)}
                                    className={`${
                                        page === p
                                        ? "flex h-7 sm:h-10 min-w-7 sm:min-w-10 items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed px-1 sm:px-2 text-xs sm:text-sm bg-red-600 text-white shadow-md hover:bg-red-700"
                                        : "flex h-7 sm:h-10 min-w-7 sm:min-w-10 items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:cursor-not-allowed px-1 sm:px-2 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                    }`}
                                    aria-current="page">
                                    {p}
                                    </button>
                                )
                                )}
                            </div>
                            {/* Next */}
                            <button className="flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 dark:disabled:hover:bg-gray-700"
                                disabled={page === movies?.total_pages}
                                onClick={() => goToPage(page + 1)} aria-label="Next page">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right h-2.5 w-2.5 sm:h-4 sm:w-4">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </button>

                            {/* Last */}
                            <button className="flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100 dark:disabled:hover:bg-gray-700"
                                disabled={page === movies?.total_pages}
                                onClick={() => goToPage(movies!.total_pages)} aria-label="Last page">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right h-2.5 w-2.5 sm:h-4 sm:w-4">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right h-2.5 w-2.5 sm:h-4 sm:w-4 -ml-0.5 sm:-ml-2">
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </button>

                        </div>
                    </div>
                <div className="mt-4 text-center ">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Page {page} of {movies?.total_pages}</span>
                </div>
            </div>
        </nav>

    </>
    )
}