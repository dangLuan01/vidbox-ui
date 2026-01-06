import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="__classNameName_f367f3">
      <header className="absolute top-0 z-[100] w-full pt-5">
        <div className="mx-auto flex items-center justify-between max-w-[1440px] px-4 md:px-6 lg:px-8">
          <div className="w-[150px]"><button className=""></button></div>
          <div className="flex items-center gap-x-2">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-transparent h-9 w-9 bg-transparent"><svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    className="lucide lucide-sun text-black hover:text-black dark:text-white dark:hover:text-white">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                </svg></button><button type="button" id="radix-_r_0_" aria-haspopup="menu" aria-expanded="false"
                data-state="closed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    className="lucide lucide-menu text-black dark:text-white">
                    <line x1="4" x2="20" y1="12" y2="12"></line>
                    <line x1="4" x2="20" y1="6" y2="6"></line>
                    <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
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
                        in HD for Free!</h2>
                </div>
                <div className="relative mx-auto mt-8 w-full max-w-xl">
                    <div className="relative text-black dark:text-gray-200"><input type="search"
                            className="flex h-9 border px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-lg bg-[#FFFFFF] dark:bg-[#0d0d0d] py-6 pl-20 pr-4 capitalize text-black dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-600 border-[#D6D6D6] dark:border-[rgb(38.5,38.5,38.5)] focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:border-[#D6D6D6] dark:focus:border-[rgb(38.5,38.5,38.5)]"
                            placeholder="Search..." value=""/><svg xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round"
                            className="lucide lucide-search absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </svg><a href="/search">
                            <div
                                className="absolute left-1 top-1/2 flex size-10 w-16 -translate-y-1/2 items-center justify-center gap-x-1 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" className="lucide lucide-filter size-3">
                                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                                </svg><span className="text-xs">Filters</span></div>
                        </a></div>
                </div>
                <div className="mt-8 text-center"><a
                        className="justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow hover:bg-primary/90 h-9 mx-auto flex max-w-[170px] items-center gap-2 rounded-lg bg-black px-8 py-2 text-white dark:bg-gradient-to-r dark:from-[#ff5722] dark:via-[#ff7f2a] dark:to-[#ffb02e] dark:shadow-md dark:hover:brightness-110"
                        href="/home">Explore Now<span className="ml-1">▶</span></a><a target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#5865F2] px-6 py-2 text-white transition hover:bg-[#4752c4]"
                        href=""><svg stroke="currentColor" fill="currentColor"
                            stroke-width="0" viewBox="0 0 640 512" color="white" style={{color:"white"}} height="20"
                            width="20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z">
                            </path>
                        </svg>Join Discord</a></div>
                <div
                    className="home-intro-box mt-16 rounded-lg px-4 py-6 sm:px-6 md:px-10 md:py-10 text-gray-700 dark:text-gray-300 space-y-6" style={{backgroundColor:"rbg(38.5,38,5,38.5)"}}>
                    <h2
                        className="mb-4 text-lg sm:text-xl md:text-2xl font-semibold leading-tight text-gray-800 dark:text-gray-300">
                        Vidbox - Watch Movies Online in HD for Free!</h2>
                    <p className="leading-relaxed">vidbox.cc - the ultimate online movie streaming website that
                        brings the magic of cinema to your fingertips. With a vast and diverse database, as well as a
                        multitude of exciting features,vidbox.cc offers an unparalleled movie-watching
                        experience for film enthusiasts worldwide.</p>
                    <p className="leading-relaxed">At vidbox.cc, we take pride in our extensive database
                        that encompasses a wide range of movies from various genres, eras, and countries. From Hollywood
                        blockbusters to independent gems, we have something for everyone. Our database is continuously
                        updated with the latest releases, ensuring that you stay up-to-date with the hottest films in
                        the industry.</p>
                    <p className="leading-relaxed">One of the standout features of vidbox.cc is our
                        personalized recommendation system. Our sophisticated algorithms analyze your viewing history,
                        preferences, and ratings to curate a customized list of movie recommendations tailored
                        specifically to your tastes. Discover new films you'll love and embark on exciting cinematic
                        adventures you never knew existed.</p>
                    <p className="leading-relaxed">In addition to our large database and personalized recommendations,
                        vidbox.cc offers high-quality streaming for an immersive viewing experience.
                        Enjoy movies in stunning high-definition resolution, accompanied by crisp audio, bringing the
                        theater experience right to your home. Our adaptive streaming technology ensures smooth
                        playback, adjusting to your internet connection for uninterrupted enjoyment.</p>
                    <p className="leading-relaxed">vidbox.cc also understands the importance of convenience and
                        accessibility. Our platform is compatible with various devices, including laptops, tablets, and
                        smartphones, allowing you to watch movies anytime, anywhere. Whether you're at home or on the
                        go, vidbox.cc keeps you connected to your favorite films.</p>
                    <p className="leading-relaxed">Furthermore, vidbox.cc fosters a vibrant community of
                        movie enthusiasts. Engage in discussions, share reviews, and interact with fellow cinephiles
                        through our dedicated forums and social features. Connect with like-minded individuals, exchange
                        recommendations, and dive deeper into the world of cinema.</p>
                    <p className="leading-relaxed">In summary, vidbox.cc is the ultimate online movie
                        streaming destination, offering a vast database, personalized recommendations, high-quality
                        streaming, device compatibility, and an engaging community. Prepare to be captivated by the
                        world of cinema as you embark on a cinematic journey like no other. Welcome to
                        vidbox.cc, where movies come to life.</p>
                </div>
            </main>
        </div>
    </div>
    <Footer />
</div>
  )
}
