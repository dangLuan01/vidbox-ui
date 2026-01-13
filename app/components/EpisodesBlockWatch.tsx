"use client"

import * as React from "react"
import { Episode, TvDetail } from "../types/movie";
import { SeasonSelectWatch } from "./SeasonSelectWatch";
import Link from "next/link";

export function EpisodesBlockWatch({ tv, seasonSeleted, episodeSeleted }: { tv: TvDetail, seasonSeleted:number, episodeSeleted: number }) {
    const [episodes, setEpisodes]       = React.useState<Episode[]>([])
    const [sortAsc, setSortAsc]         = React.useState(true)
    const [searchTerm, setSearchTerm]   = React.useState("")

    const visibleEpisodes = [...episodes]
        .filter((ep) => {
            const term = searchTerm.toLowerCase() 
            return ( 
                ep.name.toLowerCase().includes(term) || 
                ep.episode_number.toString().includes(term) 
            ) 
        })
        .sort((a, b) =>
            sortAsc 
            ? a.episode_number - b.episode_number 
            : b.episode_number - a.episode_number 
        )

    return (
    <div className="mb-8 mt-16">
       <div className="w-full">
          <h1 className="pb-5 text-2xl font-semibold">Episodes</h1>
          <div className="flex justify-between">
             <SeasonSelectWatch id={tv.id} season={seasonSeleted} seasons={tv.seasons ?? []} onEpisodesChange={setEpisodes}/>
             <div className="flex items-center gap-2">
                <input placeholder="Search" className="mb-1 w-32 rounded-md border bg-background px-2 py-[5px] lg:w-44" type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}/>
                <div className="mr-6 flex h-10 w-10 items-center gap-2">
                   <div onClick={() => setSortAsc(!sortAsc)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up-narrow-wide cursor-pointer">
                         <path d="m3 8 4-4 4 4"></path>
                         <path d="M7 4v16"></path>
                         <path d="M11 12h4"></path>
                         <path d="M11 16h7"></path>
                         <path d="M11 20h10"></path>
                      </svg>
                   </div>
                </div>
             </div>
          </div>
          <div dir="ltr" className="relative overflow-hidden h-[500px] [--radix-scroll-area-corner-width: 0px] [--radix-scroll-area-corner-height: 0px] px-2 pt-5" style={{position: "relative"}}>
            {/* <style>[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}</style> */}
            <div data-radix-scroll-area-viewport="" className="h-full w-full rounded-[inherit]" style={{overflow: "hidden scroll"}}>
                <div style={{minWidth: "100%", display: "table"}}>
                    {visibleEpisodes.map((episode)=> (
                    <div key={episode.episode_number} className="">
                        <div className={`mb-2 flex h-20 w-full cursor-pointer gap-2 overflow-hidden rounded-md transition-colors ${episode.episode_number === episodeSeleted && episode.season_number === seasonSeleted ? 'bg-gray-400 dark:bg-gray-900' : 'bg-gray-100 hover:bg-gray-200 dark:bg-[#2a2a30] dark:hover:bg-gray-700'}`}>
                            <Link className="flex flex-1 gap-2 overflow-hidden" href={`/watch/tv/${tv.id}?season=${episode.season_number}&episode=${episode.episode_number}`}>
                            <div className="relative h-full min-w-36">
                                <img className={`rounded-l-md object-cover ${episode.episode_number === episodeSeleted && episode.season_number === seasonSeleted ? 'blur-[1.3px]' : null}`} alt={episode.name} style={{width: "100%", height: "100%", position: "absolute", top: "0px", left: "0px", objectFit: "cover"}} 
                                src={episode.still_path}
                                loading="lazy"
                                decoding="async"
                                />
                                <div className="absolute inset-0">
                                    {episode.episode_number === episodeSeleted && episode.season_number === seasonSeleted ? (
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" className="absolute left-1/2 top-1/2 mx-auto shrink-0 -translate-x-1/2 -translate-y-1/2 fill-slate-50" viewBox="0 0 24 24">
                                                <rect width="24" height="24" fill="none"></rect>
                                                <path d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z"></path>
                                            </svg>
                                        </div>
                                    ): null}
                                    <div className="absolute left-0 top-0 rounded-br-md rounded-tl-md bg-black bg-opacity-70 px-2 py-1 text-sm text-white">{episode.episode_number}</div>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col justify-center p-2">
                                <h2 className="text-sm font-semibold">{episode.name}</h2>
                                <p className="line-clamp-2 text-xs text-gray-600 dark:text-gray-400">{episode.overview}</p>
                            </div>
                            </Link>
                            <a className="flex items-center justify-center pr-2" href={`https://dl.vidsrc.vip/tv/${tv.id}/${episode.season_number}/${episode.episode_number}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-download z-50">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" x2="12" y1="15" y2="3"></line>
                                </svg>
                            </a>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          </div>
       </div>
    </div>
  )
}
