"use client"

import * as React from "react"
import { SeasonSelect } from "@/app/components/SeasonSelect";
import { Episode, TvDetail } from "../types/movie";
import Link from "next/link";
import { Helper } from "../utils/helper";
import { ArrowUpNarrowWide, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export function EpisodesBlock({ tv }: { tv: TvDetail }) {
    const [episodes, setEpisodes]       = React.useState<Episode[]>([])
    const [sortAsc, setSortAsc]         = React.useState(true)
    const [searchTerm, setSearchTerm]   = React.useState("")
    const router                        = useRouter()
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
             <SeasonSelect id={tv.id} seasons={tv.seasons ?? []} onEpisodesChange={setEpisodes}/>
             <div className="flex items-center gap-2">
                <input placeholder="Search" className="mb-1 w-32 rounded-md border bg-background px-2 py-[5px] lg:w-44" type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}/>
                <div className="mr-6 flex h-10 w-10 items-center gap-2">
                   <div onClick={() => setSortAsc(!sortAsc)}>
                      <ArrowUpNarrowWide className="hover:scale-130 hover:transform"/>
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
                        <div className="mb-2 flex h-20 w-full cursor-pointer gap-2 overflow-hidden rounded-md transition-colors bg-gray-100 hover:bg-gray-200 dark:bg-[#2a2a30] dark:hover:bg-gray-700">
                            <button className="flex flex-1 gap-2 overflow-hidden items-start text-left" 
                                onClick={() => router.push(`/review/tv/${tv.id}?season=${episode.season_number}&episode=${episode.episode_number}`)}>
                                <div className="relative h-full min-w-36">
                                    <img className="rounded-l-md object-cover" alt={episode.name} style={{width: "100%", height: "100%", position: "absolute", top: "0px", left: "0px", objectFit: "cover"}} 
                                    src={episode.still_path}
                                    loading="lazy"
                                    decoding="async"
                                    />
                                    <div className="absolute inset-0">
                                        <div className="absolute left-0 top-0 rounded-br-md rounded-tl-md bg-black bg-opacity-70 px-2 py-1 text-sm text-white">{episode.episode_number}</div>
                                    </div>
                                    <div className="absolute inset-0">
                                        <div className="absolute right-0 bottom-0 rounded-br-md rounded-tl-md bg-black bg-opacity-70 px-2 py-1 text-sm text-white">{Helper.formatRuntime(episode.runtime)}</div>
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col justify-center p-2">
                                    <h2 className="text-sm font-semibold">{episode.name}</h2>
                                    <p className="line-clamp-2 text-xs text-gray-600 dark:text-gray-400">{episode.overview}</p>
                                </div>
                            </button>
                            <a className="flex items-center justify-center pr-2" href={`https://dl.vidsrc.vip/tv/${tv.id}/${episode.season_number}/${episode.episode_number}`}>
                                <Download className="pr-1 hover:scale-130 hover:transform" />
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
