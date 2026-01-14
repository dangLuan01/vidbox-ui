"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, } from "@/components/ui/dropdown-menu"
import { ArrowLeft, Clapperboard, Film, Home, Menu, MoonStar, Search, Sun } from "lucide-react"
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
                <ArrowLeft className="hover:scale-130 hover:transform"/>
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
            ) : theme === "dark" ? ( <MoonStar className="hover:scale-130 hover:transform"/> ) : ( <Sun className="hover:scale-130 hover:transform"/> )}
          </button>

           {/* Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-white/10">
                <Menu className="hover:scale-130 hover:transform"/>
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
