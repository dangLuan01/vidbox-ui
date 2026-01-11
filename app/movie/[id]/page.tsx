export const dynamic = 'force-dynamic';
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { DetailService } from "@/app/services/detailService";

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
    const {id}          = await params
    const detailServie  = new DetailService()
    const movie         = await detailServie.getMovieDetail(id)

    return (
    <>
     <Header />
        <div style={{position:"fixed", zIndex:"9999", top:"16px", left:"16px", right:"16px", bottom:"16px", pointerEvents:"none"}}></div>
        <main className="bg-white pb-32 text-gray-900 dark:bg-black dark:text-white">
         <div className="relative min-h-screen pb-16 text-gray-900 dark:text-gray-100 bg-white dark:bg-black" >
            <div className="hidden font-semibold sm:block" >
                <div className="relative h-[100vh] w-full" >
                    <img src={movie.backdrop_path} alt={movie.title} className="fixed object-cover" style={{width:"100%",height:"100%", objectFit:"cover", position:"absolute", top:"0", left:"0"}}/>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white dark:via-black/20 dark:to-black" ></div>
                </div>
                <div className="relative z-10 mx-auto -mt-96 max-w-screen-xl px-4 md:px-8 lg:px-12 xl:px-16" >
                    <div className="flex flex-col md:flex-row md:items-start md:space-x-32" >
                        <div className="flex-shrink-0 md:w-1/3 lg:w-1/4" >
                            <img className="mx-auto rounded-xl shadow-xl md:mx-0" src={movie.poster_path} alt={movie.title} width="300" height="450"/>
                        </div>
                        <div className="mt-6 md:mt-0 md:w-2/3 lg:w-3/4" >
                        <h1 className="mb-4 text-3xl font-bold md:text-4xl">{movie.title}</h1>
                        <div className="mb-4 flex items-center space-x-4" >
                            <div className="flex items-center" >
                                <h3 className="mr-4">Movie</h3>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star mr-1 h-5 w-5 fill-yellow-500 text-yellow-500">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                <span>{movie.vote_average.toFixed(1)}</span>
                            </div>
                            <span>{movie.release_date.substring(0, 4)}</span>
                        </div>
                        <div className="mb-4 flex flex-wrap gap-2">
                            {movie.genres?.map((genre)=>(
                                <span key={genre.id} className="rounded-full bg-slate-900 bg-opacity-40 px-3 py-1 text-sm text-white dark:bg-red-900 dark:bg-opacity-40 dark:text-red-400">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <p className="mb-6 text-lg">{movie.overview}</p>
                        <div className="flex items-center space-x-4" >
                            <a href={`/watch/movie/${movie.id}`}>
                                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-10 rounded-md mr-4 border border-white bg-white px-6 py-2 font-bold text-black transition-transform hover:scale-110 hover:bg-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play fill-black pr-1">
                                        <polygon points="6 3 20 12 6 21 6 3"></polygon>
                                    </svg>
                                    Play
                                </button>
                            </a>
                            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-secondary-foreground shadow-sm hover:bg-secondary/80 h-10 rounded-md px-8 border border-black bg-transparent font-bold transition-transform hover:scale-110 dark:border-white dark:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus mr-2 h-4 w-4">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5v14"></path>
                                </svg>
                                Watchlist
                            </button>
                            <a href={`https://dl.vidsrc.vip/movie/${movie.id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-download pr-1">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" x2="12" y1="15" y2="3"></line>
                                </svg>
                            </a>
                        </div>
                        </div>
                    </div>
                    <div className="mt-16" >
                        <h2 className="mb-6 text-2xl font-bold">Cast</h2>
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4" >
                            {movie.cast?.map((cast) => (
                                <a key={cast.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group" href={`/search?cast=${cast.name}`}>
                                <img className="h-16 w-16 rounded-full object-cover group-hover:scale-105 transition-transform" src={cast.profile_path} width="64" height="64" alt={cast.name}/>
                                <div >
                                    <h3 className="font-semibold group-hover:text-blue-500 transition-colors">{cast.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors">{cast.character}</p>
                                </div>
                            </a>
                            ))}                                
                        </div>
                    </div>
                    <div className="mt-16" >
                        <div>
                            <h1 className="pb-5 text-2xl font-bold">Trailer</h1>
                            <div className="">
                                <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title={movie.title} width="100%" height="580" src={`https://www.youtube.com/embed/${movie.trailer}?enablejsapi=1&amp;aoriginsup=1&amp;vf=1`} id="widget2"></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16" >
                        <h2 className="mb-6 text-2xl font-bold">You may also like</h2>
                        <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                            {movie.recommentdations?.map((movie) => (
                            <div key={movie.id} className="relative overflow-hidden rounded-md hover:text-white">
                                <a href={`/${movie.media_type}/${movie.id}`}>
                                    <div className="relative rounded-sm">
                                        <img className="object-cover" alt="The Iron Lady" style={{width: "100%", height: "100%"}} src={movie.poster_path}/>
                                        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center rounded-sm bg-gray-900 bg-opacity-60 opacity-0 transition-opacity hover:opacity-90 hover:backdrop-blur-[1px]">
                                            <img alt="play" width="25" height="25" src="/icon-play.png" />
                                            <div className="absolute bottom-2 px-1 text-center text-sm font-semibold leading-snug sm:text-base">
                                            <h3 className="mb-2 line-clamp-2 text-xs font-semibold">{movie.title}</h3>
                                            <p className="-mt-2 text-[10px] text-gray-400 uppercase">{movie.media_type} / {movie.release_date.substring(0, 4)}</p>
                                            </div>
                                        </div>
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
                                </a>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:hidden" >
                <div className="relative h-[100vh] w-full" >
                    <img src={movie.backdrop_path} alt={movie.title} className="object-cover w-full h-full"/>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-black" ></div>
                </div>
                <div className="relative z-10 -mt-[120%] px-4 py-6" >
                    <h1 className="mb-2 text-2xl font-semibold">{movie.title}</h1>
                    <div className="mb-4 flex items-center space-x-4" >
                        <div className="flex items-center" >
                        <h3 className="mr-4">Movie</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star mr-1 h-5 w-5 fill-yellow-500 text-yellow-500">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span>{movie.vote_average.toFixed(1)}</span>
                        </div>
                        <span>{movie.release_date.substring(0, 4)}</span>
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2" >
                        {movie.genres?.map((genre) => (
                        <span key={genre.id} className="rounded-full bg-slate-900 bg-opacity-40 px-3 py-1 text-sm text-white dark:bg-red-900 dark:bg-opacity-40 dark:text-red-400">
                            {genre.name}
                        </span>
                        ))}
                        
                    </div>
                    <p className="mb-6 text-sm">{movie.overview}</p>
                    <div className="flex flex-col gap-y-2" >
                        <a className="w-full block" href={`/watch/movie/${movie.id}`}>
                            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white text-black shadow hover:bg-gray-100 h-10 rounded-md px-8 w-full border border-gray-300 font-bold lg:transition-transform lg:hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play fill-black pr-1"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                                Play
                            </button>
                        </a>
                        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-secondary-foreground shadow-sm hover:bg-secondary/80 h-10 rounded-md px-8 w-full border border-black bg-transparent font-bold dark:border-white dark:text-white lg:transition-transform lg:hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus mr-2 h-4 w-4">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                        Watchlist
                        </button>
                        <a href={`https://dl.vidsrc.vip/movie/${movie.id}`}>
                        <button className="whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 flex w-full items-center justify-center space-x-2 border border-black lg:transition-transform lg:hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-download h-5 w-5">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" x2="12" y1="15" y2="3"></line>
                            </svg>
                            <span>Download</span>
                        </button>
                        </a>
                    </div>
                    <div className="mt-8" >
                        <h2 className="mb-4 text-xl font-bold">Cast</h2>
                        <div className="grid grid-cols-2 gap-4">
                        {movie.cast?.map((cast) => (
                        <a key={cast.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group" href={`/search?cast=${cast.name}`}>
                            <img className="h-12 w-12 rounded-full object-cover group-hover:scale-105 transition-transform" src={cast.profile_path} width="48" height="48"
                            alt={cast.name}
                            loading="lazy"
                            decoding="async"
                            />
                            <div >
                                <h3 className="font-semibold text-sm group-hover:text-blue-500 transition-colors">{cast.name}</h3>
                                <p className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors">{cast.character}</p>
                            </div>
                        </a>
                        ))}
                        </div>
                    </div>
                    <div className="mt-8" >
                        <div >
                        <h1 className="pb-5 text-2xl font-bold">Trailer</h1>
                        <div className="">
                            <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="PRIMATE | Official Trailer (2026 Movie)" width="100%" height="250" src={`https://www.youtube.com/embed/${movie.trailer}?enablejsapi=1&amp;aoriginsup=1&amp;vf=1`} id="widget4"></iframe>
                        </div>
                        </div>
                    </div>
                    <div className="mt-8" >
                        <h2 className="mb-4 text-xl font-bold">You may also like</h2>
                        <div className="grid grid-cols-3 justify-items-center gap-3">
                            {movie.recommentdations?.map((movie) =>(
                            <div className="relative overflow-hidden rounded-md hover:text-white">
                                <a href={`/${movie.media_type}/${movie.id}`}>
                                    <div className="relative rounded-sm">
                                        <img className="object-cover" alt={movie.title} style={{width: "100%", height: "100%"}} 
                                        src={movie.poster_path}
                                        loading="lazy"
                                        decoding="async"
                                        />
                                        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center rounded-sm bg-gray-900 bg-opacity-60 opacity-0 transition-opacity hover:opacity-100 hover:backdrop-blur-[2px]">
                                            <img alt="play" width="25" height="25" src="/icon-play.png"/>
                                            <div className="absolute bottom-2 px-1 text-center text-sm font-semibold leading-snug sm:text-base">
                                            <h3 className="mb-2 line-clamp-2 text-xs font-semibold">{movie.title}</h3>
                                            <p className="-mt-2 text-[10px] text-gray-400">Movie / {movie.release_date.substring(0, 4)}</p>
                                            </div>
                                        </div>
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
                                </a>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </main>
    <Footer />
    </>
    )
}