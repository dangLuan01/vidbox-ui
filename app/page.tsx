"use client"

import Footer from "@/app/components/Footer";
import { useEffect, useState } from "react";
import { SearchService } from "./services/searchService";
import { Movie } from "./types/movie";
import Link from "next/link";
import { MoonStar,Sun } from "lucide-react"
import { useRouter } from "next/navigation";

export default function Home() {
    const [query, setQuery]     = useState("") 
    const [results, setResults] = useState<Movie[]>([]) 
    const [loading, setLoading] = useState(false)
    const searchServie          = new SearchService()
    const router                = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])
  
    const [theme, setTheme]     = useState<"light" | "dark">(() =>{
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
    <div className="__classNameName_f367f3">
      <header className="absolute top-0 z-[100] w-full pt-5">
        <div className="mx-auto flex items-center justify-between max-w-[1440px] px-4 md:px-6 lg:px-8">
            <div className="w-[150px]"><button className=""></button></div>
            <div className="flex items-center gap-x-2">
                <button onClick={toggleTheme} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-transparent h-9 w-9 bg-transparent">
                {!mounted ? ( 
                <div className="h-6 w-6" /> 
                ) : theme === "dark" ? ( <MoonStar /> ) : ( <Sun /> )}
                </button>
            </div>
        </div>
        </header>
        <div className="min-h-screen w-full bg-white dark:bg-black home-gradient-bg">
            <div className="flex min-h-screen items-center justify-center p-0 pt-12 md:pt-8 md:p-5">
                <main className="relative w-full max-w-6xl rounded-lg bg-white/95 px-4 py-6 dark:bg-transparent md:p-12">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold md:text-5xl"><img src="/logo.png" alt="Logo" width="150" height="40"
                                className="mx-auto drop-shadow-xl" loading="eager"/></h1>
                        <h2 className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300">Watch Movies Online
                            in HD for Free!
                        </h2>
                    </div>
                    <div className="relative mx-auto mt-8 w-full max-w-xl">
                        <div className="relative text-black dark:text-gray-200">
                            <input type="search"
                                className="flex h-9 border px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-lg bg-[#FFFFFF] dark:bg-[#0d0d0d] py-6 pl-20 pr-4 capitalize text-black dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-600 border-[#D6D6D6] dark:border-[rgb(38.5,38.5,38.5)] focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:border-[#D6D6D6] dark:focus:border-[rgb(38.5,38.5,38.5)]"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}/>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                            strokeLinecap="round" strokeLinejoin="round"
                            className="lucide lucide-search absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                            </svg>
                            <Link href="/search">
                                <div className="absolute left-1 top-1/2 flex size-10 w-16 -translate-y-1/2 items-center justify-center gap-x-1 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                                        strokeLinejoin="round" className="lucide lucide-filter size-3">
                                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                                    </svg><span className="text-xs">Filters</span>
                                </div>
                            </Link>
                        </div>
                       
                        {query && (
                        <div className="absolute z-50 mt-2 w-full max-h-[70vh] overflow-auto rounded-xl border border-gray-200 bg-white/95 p-0 shadow-2xl backdrop-blur-md dark:border-gray-700 dark:bg-[#1a1b1e]/95 divide-y divide-gray-200 dark:divide-gray-700">
                        {loading && <div className="p-3 text-sm text-gray-500">Loading...</div>}
                        {results.map((movie) => (
                            <Link key={movie.id} href={`/${movie.media_type}/${movie.id}`} className="group flex cursor-pointer items-center gap-3 px-3 py-3 hover:bg-gray-50 dark:hover:bg-[#222225]">
                            <img alt={movie.title} 
                            width="48" height="64" className="h-16 w-12 rounded object-cover" 
                            src={movie.poster_path}
                            loading="lazy" decoding="async"/>
                            <div className="flex flex-col">
                                <span className="text-sm dark:text-white dark:group-hover:text-white">{movie.title}</span>
                                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300">
                                <span className="capitalize">{movie.media_type}</span>
                                <span>•</span>
                                <span className="flex items-center">⭐ {movie.vote_average}</span>
                                <span>•</span>
                                <span>{movie.release_date}</span>
                                </div>
                            </div>
                        </Link>
                        ))}
                        <button onClick={() => router.push(`search?query=${query}&page=1`)} className="w-full rounded-b-xl bg-gray-100 py-3 text-center text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-[#1e2023] dark:text-gray-200 dark:hover:bg-[#26282c]">See more results</button>
                        </div>
                        )}
                    </div>
                    <div className="mt-8 text-center">
                        <Link className="justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow hover:bg-primary/90 h-9 mx-auto flex max-w-[170px] items-center gap-2 rounded-lg bg-black px-8 py-2 text-white dark:bg-gradient-to-r dark:from-[#ff5722] dark:via-[#ff7f2a] dark:to-[#ffb02e] dark:shadow-md dark:hover:brightness-110"
                            href="/home">Explore Now<span className="ml-1">▶</span>
                        </Link>
                        <a target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#5865F2] px-6 py-2 text-white transition hover:bg-[#4752c4]"
                            href="https://t.me/vidhubtop">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                                </svg>
                            Join Telegram
                        </a>
                    </div>
                    <div
                        className="home-intro-box mt-16 rounded-lg px-4 py-6 sm:px-6 md:px-10 md:py-10 text-gray-700 dark:text-gray-300 space-y-6" style={{backgroundColor:"rbg(38.5,38,5,38.5)"}}>
                        <h2
                            className="mb-4 text-lg sm:text-xl md:text-2xl font-semibold leading-tight text-gray-800 dark:text-gray-300">
                            Vidbox - Watch Movies Online in HD for Free!</h2>
                        <p className="leading-relaxed">www.xoailac.top - the ultimate online movie streaming website that
                            brings the magic of cinema to your fingertips. With a vast and diverse database, as well as a
                            multitude of exciting features,www.xoailac.top offers an unparalleled movie-watching
                            experience for film enthusiasts worldwide.</p>
                        <p className="leading-relaxed">At www.xoailac.top, we take pride in our extensive database
                            that encompasses a wide range of movies from various genres, eras, and countries. From Hollywood
                            blockbusters to independent gems, we have something for everyone. Our database is continuously
                            updated with the latest releases, ensuring that you stay up-to-date with the hottest films in
                            the industry.</p>
                        <p className="leading-relaxed">One of the standout features of www.xoailac.top is our
                            personalized recommendation system. Our sophisticated algorithms analyze your viewing history,
                            preferences, and ratings to curate a customized list of movie recommendations tailored
                            specifically to your tastes. Discover new films you'll love and embark on exciting cinematic
                            adventures you never knew existed.</p>
                        <p className="leading-relaxed">In addition to our large database and personalized recommendations,
                            www.xoailac.top offers high-quality streaming for an immersive viewing experience.
                            Enjoy movies in stunning high-definition resolution, accompanied by crisp audio, bringing the
                            theater experience right to your home. Our adaptive streaming technology ensures smooth
                            playback, adjusting to your internet connection for uninterrupted enjoyment.</p>
                        <p className="leading-relaxed">www.xoailac.top also understands the importance of convenience and
                            accessibility. Our platform is compatible with various devices, including laptops, tablets, and
                            smartphones, allowing you to review movies anytime, anywhere. Whether you're at home or on the
                            go, www.xoailac.top keeps you connected to your favorite films.</p>
                        <p className="leading-relaxed">Furthermore, www.xoailac.top fosters a vibrant community of
                            movie enthusiasts. Engage in discussions, share reviews, and interact with fellow cinephiles
                            through our dedicated forums and social features. Connect with like-minded individuals, exchange
                            recommendations, and dive deeper into the world of cinema.</p>
                        <p className="leading-relaxed">In summary, www.xoailac.top is the ultimate online movie
                            streaming destination, offering a vast database, personalized recommendations, high-quality
                            streaming, device compatibility, and an engaging community. Prepare to be captivated by the
                            world of cinema as you embark on a cinematic journey like no other. Welcome to
                            www.xoailac.top, where movies come to life.</p>
                    </div>
                </main>
            </div>
        </div>
        <Footer />
    </div>
  )
}
