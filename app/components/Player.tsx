"use client"

import { useState } from "react";
import { Servers } from "../types/server";
import { Bookmark, Check, Download, Forward, Server, X } from "lucide-react";

interface PlayerProps { 
    id: string
    media_type: string
    servers: Servers[]
    safeSeason?: number
    safeEpisode?: number
}
export default function Player({ id, media_type, servers, safeSeason, safeEpisode }: PlayerProps) {
    const [open, setOpen] = useState(false) 
    const [auto, setAuto] = useState(false) 
    const [selectedServer, setSelectedServer] = useState(servers[0])

    return (
    <>
        <div className="relative mx-auto h-[400px] w-full overflow-hidden rounded-lg shadow-lg md:aspect-video md:h-full lg:w-3/4">
            <button onClick={() => setOpen(!open)} className="absolute left-0 right-0 top-0 z-20 mx-auto flex h-10 w-40 items-center justify-center gap-x-2 rounded-b-[12px] bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20">
                {open ? (
                <>
                <X />
                Close
                </>
                ):(
                <>
                <Server />
                Select a server
                </>
                )}
            </button>
            <div className={`absolute left-0 right-0 top-12 z-30 mx-auto w-fit max-w-[95vw] rounded-xl sm:rounded-2xl bg-black/95 backdrop-blur-xl border border-white/10 p-3 sm:p-4 md:p-6 text-white transition-all duration-300 shadow-2xl ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}>
                <div className="max-h-[250px] sm:max-h-[300px] lg:max-h-none overflow-auto px-3 py-2 scrollbar-thin lg:scrollbar-none" style={{scrollbarWidth: "thin", scrollbarColor: "rgb(107, 114, 128) transparent", touchAction: "pan-y"}}>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                        {servers.map((server) => (
                        <button key={server.id} onClick={() => {
                            setSelectedServer(server)
                            setOpen(false)
                        }} 
                        className={`group relative w-full rounded-lg sm:rounded-xl px-2 py-2 sm:px-3 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 ${
                            selectedServer.id === server.id
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg ring-1 ring-blue-400/50"
                            : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
                        }`}
                        >
                            <div className="flex flex-col items-center gap-1 sm:gap-2">
                                <div className="relative">
                                    <img alt={server.name} className="w-4 h-3 sm:w-5 sm:h-4 md:w-6 md:h-4 rounded-sm object-cover shadow-sm" src={server.image}/>
                                    {selectedServer.id === server.id ? (
                                        <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center">
                                            <Check />
                                        </div>
                                    ): null}
                                </div>
                                <span className="text-[10px] sm:text-xs font-semibold text-center leading-tight">{server.name}</span>
                            </div>
                        </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="absolute left-0 top-0 h-full w-full">
                <iframe src="about:blank" className="absolute left-0 top-0 h-full w-full transition-opacity duration-200 opacity-0 pointer-events-none " data-provider-name={setSelectedServer.name}></iframe>
                {media_type === 'tv' ? (
                    <iframe src={`${selectedServer.embed}/tv/${id}/${safeSeason}/${safeEpisode}${auto ? "?nextEpisode=true&autoplayNextEpisode=true&episodeSelector=true" : ""}`} className="absolute left-0 top-0 h-full w-full transition-opacity duration-200 opacity-100 z-10 " allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen data-provider-name={selectedServer.name}></iframe>
                ):(
                    <iframe src={`${selectedServer.embed}/movie/${id}`} className="absolute left-0 top-0 h-full w-full transition-opacity duration-200 opacity-100 z-10 " allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen data-provider-name={selectedServer.name}></iframe>
                )}
                
            </div>
        </div>
        {media_type === "movie" ?(
            <div className="relative z-10 mx-auto -mt-[5px] flex w-full items-center justify-center gap-x-4 rounded-b-lg bg-gray-900 py-1 text-sm text-white lg:w-3/4">
            <button className="flex cursor-pointer items-center gap-x-1 rounded-md transition-all">
                <Bookmark className="h-4 w-4"/>
                <span className="hidden lg:block">Add to Watchlist</span>
            </button>
            <label className="flex cursor-pointer items-center gap-x-1 rounded-md transition-all">
                <Forward className="h-4 w-4"/>
                <span className="hidden lg:block">Share</span>
            </label>
            <a href={`https://dl.vidsrc.vip/${media_type}/${id}`}>
                <label className="flex cursor-pointer items-center gap-x-1 rounded-md transition-all">
                    <Download className="h-4 w-4"/>
                    <span className="hidden lg:block">Download</span>
                </label>
            </a>
        </div>
        ):(       
        <div className="relative z-10 mx-auto -mt-[5px] flex w-full items-center justify-center gap-x-4 rounded-b-lg bg-gray-900 py-1 text-sm text-white lg:w-3/4">
            <div className="flex items-center gap-x-2">
                <button onClick={() => setAuto(!auto)} type="button" role="switch" aria-checked="true" data-state={auto ? ("checked"):("unchecked")}
                    value="on"
                    className="peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-red-600 data-[state=unchecked]:bg-gray-200 dark:focus-visible:ring-gray-800 dark:focus-visible:ring-offset-gray-900 dark:data-[state=unchecked]:bg-gray-800 h-4 w-7">
                <span
                    data-state={auto ? ("checked"):("unchecked")}
                    className="pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"></span></button><span
                    className="lg:block">Auto Next
                </span>
            </div>
            <button className="flex cursor-pointer items-center gap-x-1 rounded-md transition-all">
                <Bookmark className="h-4 w-4"/>
                <span className="hidden lg:block">Add to Watchlist</span>
            </button>
            <label className="flex cursor-pointer items-center gap-x-1 rounded-md transition-all">
                <Forward className="h-4 w-4"/>
                <span className="hidden lg:block">Share</span>
            </label>
            <a href={`https://dl.vidsrc.vip/${media_type}/${id}/${safeSeason}/${safeEpisode}`}>
                <label className="flex cursor-pointer items-center gap-x-1 rounded-md transition-all">
                    <Download className="h-4 w-4"/>
                    <span className="hidden lg:block">Download</span>
                </label>
            </a>
        </div>
        )}
    </>
    )
}