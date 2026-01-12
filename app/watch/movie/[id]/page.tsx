export const dynamic = 'force-dynamic';
import Footer from "@/app/components/Footer";
import HeaderWatch from "@/app/components/HeaderWatch";
import { DetailService } from "@/app/services/detailService";
import Player from "@/app/components/Player";
import { servers } from "@/app/data/server";


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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bell h-3 w-3 fill-white">
                            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                        </svg>
                        <span className="text-[7px] xs:text-[12px] sm:text-[12px] md:text-sm lg:text-base">Please switch to other servers if default server doesnt work.</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x h-8 w-8 cursor-pointer justify-end pr-2">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
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