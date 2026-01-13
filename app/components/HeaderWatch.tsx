"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, } from "@/components/ui/dropdown-menu"
import { Clapperboard, Film, Home, Menu, MoonStar, Search, Sun } from "lucide-react"
import Link from "next/link"

export default function HeaderWatch() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
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

  }, [theme])
  
  return (
    <header className="absolute top-0 z-[100] w-full pt-5">
      <div className="mx-auto flex items-center justify-between max-w-[1440px] px-4 md:px-6 lg:px-8">
        {/*Button Back*/}
        <div className="w-[150px]">
            <button className="" onClick={() => router.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left text-2xl font-bold text-black dark:text-white hover:scale-110 hover:transform">
                    <path d="m12 19-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                </svg>
            </button>
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
