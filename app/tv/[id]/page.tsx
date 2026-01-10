export const dynamic = 'force-dynamic';
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function TvPage() {
    return (
        <>
         <Header />
         <div style={{position:"fixed", zIndex:"9999", top:"16px", left:"16px", right:"16px", bottom:"16px", pointerEvents:"none"}}></div>
         <main className="bg-white pb-32 text-gray-900 dark:bg-black dark:text-white">
            <div className="relative min-h-screen pb-16 text-gray-900 dark:text-gray-100 bg-white dark:bg-black">
               <div className="relative h-[95vh] overflow-hidden w-full">
                  <img alt="Stranger Things" className="object-cover w-full h-full" loading="lazy" style={{objectFit: "cover"}} src="https://image.tmdb.org/t/p/original/cSJPoENi4D16FirmDbHsVGHXpge.jpg"/>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white dark:via-black/60 dark:to-black"></div>
               </div>
               <div className="relative z-10 mx-auto -mt-96 max-w-screen-xl px-4 md:px-8 lg:px-12 xl:px-16">
                  <div className="flex flex-col md:flex-row md:items-start md:space-x-32">
                     <div className="hidden flex-shrink-0 md:block md:w-1/3 lg:w-1/4"><img className="mx-auto rounded-xl shadow-xl md:mx-0" alt="Stranger Things" width="300" height="450" src="https://image.tmdb.org/t/p/w342/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg"/></div>
                     <div className="mt-6 md:mt-0 md:w-2/3 lg:w-3/4">
                        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Stranger Things</h1>
                        <div className="mb-4 flex items-center space-x-4">
                           <div className="flex items-center">
                              <h3 className="mr-4">Tv</h3>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-star mr-1 h-5 w-5 fill-yellow-500 text-yellow-500">
                                 <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <span>8.6</span>
                           </div>
                           <span>2016</span>
                        </div>
                        <div className="mb-4 flex flex-wrap gap-2"><span className="rounded-full bg-slate-900 bg-opacity-40 px-3 py-1 text-sm text-white dark:bg-red-900 dark:bg-opacity-40 dark:text-red-400">Sci-Fi &amp; Fantasy</span><span className="rounded-full bg-slate-900 bg-opacity-40 px-3 py-1 text-sm text-white dark:bg-red-900 dark:bg-opacity-40 dark:text-red-400">Mystery</span><span className="rounded-full bg-slate-900 bg-opacity-40 px-3 py-1 text-sm text-white dark:bg-red-900 dark:bg-opacity-40 dark:text-red-400">Action &amp; Adventure</span></div>
                        <p className="mb-6 text-lg">When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.</p>
                        <div className="hidden md:block">
                           <div className="flex items-center space-x-4">
                              <a href="/watch/tv/66732?season=1&amp;episode=1">
                                 <button className="inline-flex items-center justify-center whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-10 rounded-md mr-4 border border-white bg-white px-6 py-2 font-bold text-black transition-transform hover:scale-110 hover:bg-gray-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play fill-black pr-1"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                                    Play
                                 </button>
                              </a>
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
                           <a className="w-full block" href="/watch/tv/66732?season=1&amp;episode=1">
                              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 w-full border border-white font-bold lg:transition-transform lg:hover:scale-110">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-play fill-black pr-1">
                                    <polygon points="6 3 20 12 6 21 6 3"></polygon>
                                 </svg>
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
                        </div>
                     </div>
                  </div>
                  <div className="mt-16">
                     <h2 className="mb-6 text-2xl font-bold">Cast</h2>
                     <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                        <a className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group" href="/search?cast=Winona%20Ryder">
                           <img className="h-16 w-16 rounded-full object-cover group-hover:scale-105 transition-transform" width="64" height="64" alt="Winona Ryder" src="https://image.tmdb.org/t/p/w185/dlffgYbqr1BllWacVLhAFw23nLl.jpg"/>
                           <div>
                              <h3 className="font-semibold group-hover:text-blue-500 transition-colors">Winona Ryder</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors">Joyce Byers</p>
                           </div>
                        </a>
                     </div>
                  </div>
                  <div className="mb-8 mt-16">
                     <div className="w-full">
                        <h1 className="pb-5 text-2xl font-semibold">Episodes</h1>
                        <div className="flex justify-between">
                           <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-[160px] justify-between" role="combobox" aria-expanded="false" type="button" aria-haspopup="dialog" aria-controls="radix-_r_e_" data-state="closed">
                              Season 1
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-up-down ml-2 h-4 w-4 shrink-0 opacity-50">
                                 <path d="m7 15 5 5 5-5"></path>
                                 <path d="m7 9 5-5 5 5"></path>
                              </svg>
                           </button>
                           <div className="flex items-center gap-2">
                              <input placeholder="Search" className="mb-1 w-32 rounded-md border bg-background px-2 py-[5px] lg:w-44" type="text" value="" />
                              <div className="mr-6 flex h-10 w-10 items-center gap-2">
                                 <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up-narrow-wide cursor-pointer">
                                       <path d="m3 8 4-4 4 4"></path>
                                       <path d="M7 4v16"></path>
                                       <path d="M11 12h4"></path>
                                       <path d="M11 16h7"></path>
                                       <path d="M11 20h10"></path>
                                    </svg>
                                 </div>
                                 <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-list cursor-pointer">
                                       <line x1="8" x2="21" y1="6" y2="6"></line>
                                       <line x1="8" x2="21" y1="12" y2="12"></line>
                                       <line x1="8" x2="21" y1="18" y2="18"></line>
                                       <line x1="3" x2="3.01" y1="6" y2="6"></line>
                                       <line x1="3" x2="3.01" y1="12" y2="12"></line>
                                       <line x1="3" x2="3.01" y1="18" y2="18"></line>
                                    </svg>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div dir="ltr" className="relative overflow-hidden h-[500px] [--radix-scroll-area-corner-width: 0px] [--radix-scroll-area-corner-height: 0px] px-2 pt-5" style={{position: "relative"}}>
                           {/* <style>[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}</style> */}
                           <div data-radix-scroll-area-viewport="" className="h-full w-full rounded-[inherit]" style={{overflow: "hidden scroll"}}>
                              <div style={{minWidth: "100%", display: "table"}}>
                                 <div className="">
                                    <div className="mb-2 flex h-20 w-full cursor-pointer gap-2 overflow-hidden rounded-md transition-colors bg-gray-100 hover:bg-gray-200 dark:bg-[#2a2a30] dark:hover:bg-gray-700">
                                       <a className="flex flex-1 gap-2 overflow-hidden" href="/watch/tv/66732?season=1&amp;episode=1">
                                          <div className="relative h-full min-w-36">
                                             <img className="rounded-l-md object-cover" alt="Chapter One: The Vanishing of Will Byers" style={{width: "100%", height: "100%", position: "absolute", top: "0px", left: "0px", objectFit: "cover"}} src="https://image.tmdb.org/t/p/w500/6jSA6JpxNDV63aDXpmsUFCjCINb.jpg"/>
                                             <div className="absolute inset-0">
                                                <div className="absolute left-0 top-0 rounded-br-md rounded-tl-md bg-black bg-opacity-70 px-2 py-1 text-sm text-white">1</div>
                                             </div>
                                          </div>
                                          <div className="flex flex-1 flex-col justify-center p-2">
                                             <h2 className="text-sm font-semibold">Chapter One: The Vanishing of Will Byers</h2>
                                             <p className="line-clamp-2 text-xs text-gray-600 dark:text-gray-400">On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.</p>
                                          </div>
                                       </a>
                                       <a className="flex items-center justify-center pr-2" href="https://dl.vidsrc.vip/tv/66732/1/1">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-download z-50">
                                             <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                             <polyline points="7 10 12 15 17 10"></polyline>
                                             <line x1="12" x2="12" y1="15" y2="3"></line>
                                          </svg>
                                       </a>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="mt-8 sm:hidden">
                     <div>
                        <h1 className="pb-5 text-2xl font-bold">Trailer</h1>
                        <div className=""><iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="Stranger Things (2016) Trailer - 80's VHS Tape" width="100%" height="250" src="https://www.youtube.com/embed/8znAI7F7MEE?enablejsapi=1&amp;origin=https%3A%2F%2Fvidbox.cc&amp;widgetid=9&amp;forigin=https%3A%2F%2Fvidbox.cc%2Ftv%2F66732&amp;aoriginsup=0&amp;vf=1" id="widget10"></iframe></div>
                     </div>
                  </div>
                  <div className="hidden sm:block">
                     <div>
                        <h1 className="pb-5 text-2xl font-bold">Trailer</h1>
                        <div className=""><iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="Stranger Things (2016) Trailer - 80's VHS Tape" width="100%" height="580" src="https://www.youtube.com/embed/8znAI7F7MEE?enablejsapi=1&amp;origin=https%3A%2F%2Fvidbox.cc&amp;widgetid=11&amp;forigin=https%3A%2F%2Fvidbox.cc%2Ftv%2F66732&amp;aoriginsup=0&amp;vf=1" id="widget12"></iframe></div>
                     </div>
                  </div>
                  <div className="mt-16">
                     <h2 className="mb-4 text-2xl font-bold">You may also like</h2>
                     <div className="grid grid-cols-3 justify-items-center gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                        <div className="relative overflow-hidden rounded-md hover:text-white">
                           <a href="/tv/63247">
                              <div className="relative rounded-sm">
                                 <img className="object-cover" alt="Westworld" style={{width: "100%", height: "100%"}} src="https://image.tmdb.org/t/p/w342/8MfgyFHf7XEboZJPZXCIDqqiz6e.jpg"/>
                                 <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center rounded-sm bg-gray-900 bg-opacity-60 opacity-0 transition-opacity hover:opacity-100 hover:backdrop-blur-[2px]">
                                    <img alt="play" width="25" height="25" src="/icon-play.png"/>
                                    <div className="absolute bottom-2 px-1 text-center text-sm font-semibold leading-snug sm:text-base">
                                       <h3 className="mb-2 line-clamp-2 text-xs font-semibold">Westworld</h3>
                                       <p className="-mt-2 text-[10px] text-gray-400">Tv / 2016</p>
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
                                    8.0
                                 </div>
                              </div>
                           </a>
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