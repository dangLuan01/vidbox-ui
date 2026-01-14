export const dynamic = 'force-dynamic';
import Footer from "@/app/components/Footer";
import HeaderWatch from "@/app/components/HeaderWatch";
import { DetailService } from "@/app/services/detailService";
import Player from "@/app/components/Player";
import { servers } from "@/app/data/server";
import { Metadata } from "next";
import { Bell, X } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> { 
   const {id} = await params
   const detailService = new DetailService() 
   const tv = await detailService.getMovieDetail(id)
   return { 
      title: `Watch ${tv.title}`, 
      description: tv.overview || "Watch Movies on VidHub"
   } 
}

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
    const {id}          = await params
    const detailServie  = new DetailService()
    const movie         = await detailServie.getMovieDetail(id)

    return (
    <>
    <HeaderWatch />
    <main className="relative min-h-screen bg-gray-800">
        <div className="absolute inset-0 blur-sm">
            <img className="fixed object-cover w-full h-full" alt={movie.title} 
            style={{width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: "0px", left: "0px"}} 
            src={movie.backdrop_path}/>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white dark:via-black/20 dark:to-black"></div>
        </div>
        <div className="relative z-10">
            <div className="min-h-screen pt-16">
                <div className="mx-auto max-w-screen-xl px-4">
                    <h1 className="truncate pb-5 text-center text-xl font-semibold">Now Watching: <span className="font-bold">{movie.title}</span></h1>
                    <div className="mx-auto mb-2 flex w-full items-center rounded-lg text-white shadow-lg backdrop-blur-sm lg:w-3/4 lg:pl-6" style={{background: "linear-gradient(90deg, rgb(255, 0, 0) 0%, rgb(255, 68, 68) 50%, rgb(255, 102, 102) 100%)"}}>
                    <div className="flex w-full items-center justify-center gap-x-2 p-2 text-sm">
                        <Bell className="h-3 w-3 fill-white"/>
                        <span className="text-[7px] xs:text-[12px] sm:text-[12px] md:text-sm lg:text-base">Please switch to other servers if default server doesnt work.</span>
                    </div>
                    <X className="cursor-pointer justify-end pr-2"/>
                    </div>
                    <Player id={id} media_type="movie" servers={servers}/>
                </div>
            </div>
        </div>
    </main>
    <Footer />
    </>
    )
}