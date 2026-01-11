"use client"

import { useEffect, useState } from "react"

export default function HeaderWatch() {
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
            <button className="">
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
        </div>
      </div>
    </header>
  )
}
