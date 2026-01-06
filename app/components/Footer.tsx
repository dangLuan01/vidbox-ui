export default function Footer() {
    return (
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
                        vidbox.to is top of free streaming website, where to watch movies online free without
                        registration required. With a big database and great features, we're confident. vidbox.to is the
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
    )
}