export const revalidate = 900;
export const runtime = "edge";

import Footer from "@/app/components/Footer";
import { DetailService } from "@/app/services/detailService";
import { EpisodesBlock } from "@/app/components/EpisodesBlock";
import Link from "next/link";
import HeaderWatch from "@/app/components/HeaderWatch";

export default async function TvPage({ params }: { params: Promise<{ id: string }> }) {
   const {id} = await params
   const detailServie = new DetailService()
   const tv = await detailServie.getTvDetail(id)

   return (
        <>
         <HeaderWatch />
         <div style={{position:"fixed", zIndex:"9999", top:"16px", left:"16px", right:"16px", bottom:"16px", pointerEvents:"none"}}></div>
         <main className="bg-white pb-32 text-gray-900 dark:bg-black dark:text-white">
            <div className="relative min-h-screen pb-16 text-gray-900 dark:text-gray-100 bg-white dark:bg-black">
               <div className="relative h-[95vh] overflow-hidden w-full">
                  <img alt={tv.title}
                  className="object-cover w-full h-full" 
                  loading="lazy"
                  style={{objectFit: "cover"}} 
                  src={tv.backdrop_path}/>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white dark:via-black/60 dark:to-black"></div>
               </div>
               <div className="relative z-10 mx-auto -mt-96 max-w-screen-xl px-4 md:px-8 lg:px-12 xl:px-16">
                  <div className="flex flex-col md:flex-row md:items-start md:space-x-32">
                     <div className="hidden flex-shrink-0 md:block md:w-1/3 lg:w-1/4">
                        <img className="mx-auto rounded-xl shadow-xl md:mx-0" 
                        alt={tv.title} width="300" height="450" 
                        src={tv.poster_path}/>
                     </div>
                     <div className="mt-6 md:mt-0 md:w-2/3 lg:w-3/4">
                        <h1 className="mb-4 text-3xl font-bold md:text-4xl">{tv.title}</h1>
                        <div className="mb-4 flex items-center space-x-4">
                           <div className="flex items-center">
                              <h3 className="mr-4">Tv</h3>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star mr-1 h-5 w-5 fill-yellow-500 text-yellow-500">
                                 <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <span>{tv.vote_average.toFixed(1) ?? "0.0"}</span>
                           </div>
                           <span>{tv.release_date.substring(0, 4) ?? ""}</span>
                        </div>
                        <div className="mb-4 flex flex-wrap gap-2">
                           {tv.genres?.map((genre) => (
                              <span key={genre.id} className="rounded-full bg-slate-900 bg-opacity-40 px-3 py-1 text-sm text-white dark:bg-red-900 dark:bg-opacity-40 dark:text-red-400">
                                 {genre.name}
                              </span>
                           ))}
                        </div>
                        <p className="mb-6 text-lg">{tv.overview}</p>
                        <div className="hidden md:block">
                           <div className="flex items-center space-x-4">
                              <Link href={`/watch/tv/${tv.id}?season=1&episode=1`}>
                                 <button className="inline-flex items-center justify-center whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-10 rounded-md mr-4 border border-white bg-white px-6 py-2 font-bold text-black transition-transform hover:scale-110 hover:bg-gray-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play fill-black pr-1"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                                    Play
                                 </button>
                              </Link>
                              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-secondary-foreground shadow-sm hover:bg-secondary/80 h-10 rounded-md px-8 border border-black bg-transparent font-bold dark:border-white dark:text-white lg:transition-transform lg:hover:scale-110">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus mr-2 h-4 w-4">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5v14"></path>
                                 </svg>
                                 Watchlist
                              </button>
                           </div>
                        </div>
                        <div className="flex flex-col gap-y-2 md:hidden">
                           <Link className="w-full block" href={`/watch/tv/${tv.id}?season=1&amp;episode=1`}>
                              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white text-black shadow hover:bg-gray-100 h-10 rounded-md px-8 w-full border border-gray-300 font-bold lg:transition-transform lg:hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play fill-black pr-1"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                                Play
                            </button>
                           </Link>
                           <button className="inline-flex items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-secondary-foreground shadow-sm hover:bg-secondary/80 h-10 rounded-md px-8 w-full border border-black bg-transparent font-bold dark:border-white dark:text-white lg:transition-transform lg:hover:scale-110">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus mr-2 h-4 w-4">
                                 <path d="M5 12h14"></path>
                                 <path d="M12 5v14"></path>
                              </svg>
                              Watchlist
                           </button>
                        </div>
                     </div>
                  </div>
                  <div className="mt-16">
                     <h2 className="mb-6 text-2xl font-bold">Cast</h2>
                     <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                     {tv.cast?.map((cast) => (
                        <a key={cast.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group" href="/search?cast=Winona%20Ryder">
                           <img className="h-16 w-16 rounded-full object-cover group-hover:scale-105 transition-transform" width="64" height="64" 
                           alt={cast.name}
                           src={cast.profile_path}
                           loading="lazy"
                           decoding="async"
                           />
                           <div>
                              <h3 className="font-semibold group-hover:text-blue-500 transition-colors">{cast.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors">{cast.character}</p>
                           </div>
                        </a>
                     ))}
                     </div>
                  </div>
                  <EpisodesBlock tv={tv}/>
                  <div className="mt-8 sm:hidden">
                     <div>
                        <h1 className="pb-5 text-2xl font-bold">Trailer</h1>
                        <div className="">
                           <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title={`${tv.title} Trailer`} width="100%" height="250" src={`https://www.youtube.com/embed/${tv.trailer}?enablejsapi=1&amp;aoriginsup=0&amp;vf=1`} id="widget10"></iframe>
                        </div>
                     </div>
                  </div>
                  <div className="hidden sm:block">
                     <div>
                        <h1 className="pb-5 text-2xl font-bold">Trailer</h1>
                        <div className="">
                           <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title={`${tv.title} Trailer`} width="100%" height="580" src={`https://www.youtube.com/embed/${tv.trailer}?enablejsapi=1&amp;aoriginsup=0&amp;vf=1`} id="widget12"></iframe>
                        </div>
                     </div>
                  </div>
                  <div className="mt-16">
                     <h2 className="mb-4 text-2xl font-bold">You may also like</h2>
                     <div className="grid grid-cols-3 justify-items-center gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                        {tv.recommentdations?.map((tv) => (
                        <div key={tv.id} className="relative overflow-hidden rounded-md hover:text-white">
                           <Link href={`/tv/${tv.id}`}>
                              <div className="relative rounded-sm">
                                 <img className="object-cover" alt={tv.title} style={{width: "100%", height: "100%"}} 
                                 src={tv.poster_path}
                                 loading="lazy"
                                 decoding="async"
                                 />
                                 <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center rounded-sm bg-gray-900 bg-opacity-60 opacity-0 transition-opacity hover:opacity-90 hover:backdrop-blur-[1px]">
                                    <img alt="play" width="25" height="25" src="/icon-play.png"/>
                                    <div className="absolute bottom-2 px-1 text-center text-sm font-semibold leading-snug sm:text-base">
                                       <h3 className="mb-2 line-clamp-2 text-xs font-semibold">{tv.title}</h3>
                                       <p className="-mt-2 text-[10px] text-gray-400 uppercase">{tv.media_type} / {tv.release_date.substring(0, 4) ?? ""}</p>
                                    </div>
                                 </div>
                                 <button className="absolute top-2 left-0.5 z-10 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-110 active:scale-95 bg-black/50 text-white/70 hover:bg-blue-500/50 hover:text-white" aria-label="Add to watchlist">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bookmark-plus h-5 w-5">
                                       <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                                       <line x1="12" x2="12" y1="7" y2="13"></line>
                                       <line x1="15" x2="9" y1="10" y2="10"></line>
                                    </svg>
                                 </button>
                                 <div className="absolute right-0 top-2 flex gap-1 rounded-l bg-black bg-opacity-50 pl-1 text-xs font-semibold text-white">
                                    <svg className="h-4 w-4 fill-yellow-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                                    </svg>
                                    {tv.vote_average.toFixed(1) ?? "0.0"}
                                 </div>
                              </div>
                           </Link>
                        </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </main>
         <Footer />
      </>
    )
}