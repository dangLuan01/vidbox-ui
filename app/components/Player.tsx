"use client"

import { useState } from "react";
import { Server } from "../types/server";

interface PlayerProps { 
    id: string
    media_type: string
    servers: Server[]
    safeSeason?: string
    safeEpisode?: string
}
export default function Player({ id, media_type, servers, safeSeason, safeEpisode }: PlayerProps) {
    const [open, setOpen] = useState(false) 
    const [selectedServer, setSelectedServer] = useState(servers[0])

    return (
        <div className="relative mx-auto h-[400px] w-full overflow-hidden rounded-lg shadow-lg md:aspect-video md:h-full lg:w-3/4">
            <button onClick={() => setOpen(!open)} className="absolute left-0 right-0 top-0 z-20 mx-auto flex h-10 w-40 items-center justify-center gap-x-2 rounded-b-[12px] bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20">
                {open ? (
                <>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
                Close
                </>
                ):(
                <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-7 md:w-7" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20 3H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-5 5h-2V6h2zm4 0h-2V6h2zm1 5H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zm-5 5h-2v-2h2zm4 0h-2v-2h2z"></path>
                </svg>
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
                                            <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                            </svg>
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
                    <iframe src={`${selectedServer.embed}/tv/${id}/${safeSeason}/${safeEpisode}`} className="absolute left-0 top-0 h-full w-full transition-opacity duration-200 opacity-100 z-10 " allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen data-provider-name={selectedServer.name}></iframe>
                ):(
                    <iframe src={`${selectedServer.embed}/movie/${id}`} className="absolute left-0 top-0 h-full w-full transition-opacity duration-200 opacity-100 z-10 " allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen data-provider-name={selectedServer.name}></iframe>
                )}
                
            </div>
        </div>
    )
}