export default function Header() {
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
              value=""
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
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md 
                            text-sm font-medium transition-colors focus-visible:outline-none 
                            focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none 
                            disabled:opacity-50 hover:bg-transparent h-9 w-9 bg-transparent">
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
