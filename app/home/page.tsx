export const dynamic = 'force-dynamic';
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import HeroCarousel from "@/app/components/HeroCarousel"
import HotCarousel from "@/app/components/HotCarousel"
import ProviderCarousel from "../components/ProviderCarousel"
import { topics } from "@/app/data/topics"
import { ProviderService } from "../services/providerService"
import { TrendingService } from "../services/trendingService"
import { Image } from "../types/images"
import { GenreService } from "../services/genreService"
import clsx from "clsx"
import MovieRow from "../components/MovieRow"
import { TopicService } from "../services/topicService"

export default async function Home() {
  
  const serviceProvider = new ProviderService()
  const serviceTrending = new TrendingService()
  const genreService    = new GenreService()
  const topicService    = new TopicService()

  const [providers, trendingDay, trendingWeek, genres, moviesByTopic] = await Promise.all([
    serviceProvider.getMovieProviders("en-US"),
    serviceTrending.getMovieDayTrending("en-US"),
    serviceTrending.getMovieWeekTrending("en-US"),
    genreService.getAllGenres("en-US"),
    Promise.all(
      topics.map(async (topic) => {
        const movies = await topicService.getTopicMovies(topic.url_topic, topic.media_type, "en-US")
        return { ...topic, movies}
      })
    )
  ])
  
  const logos: Image[] = await serviceTrending.getLogosTrendingMovies(trendingDay)
  const logoMap = new Map<number, Image>() 
  logos.forEach((logo) => { 
    logoMap.set(logo.id, logo) 
  })

  //const moviesByTopic = await 
  
  return (
    <>
      <Header />
      <div style={{position:"fixed", zIndex:"9999", top:"16px", left:"16px", right:"16px", bottom:"16px", pointerEvents:"none"}}></div>
      <main className="bg-white pb-32 text-gray-900 dark:bg-black dark:text-white">
        <div className="relative h-screen w-full">
          <HeroCarousel movies={trendingDay} logos={logoMap}/>
          <HotCarousel movies={trendingWeek} genres={genres}/>
        </div>
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8 pt-28">
          
          <ProviderCarousel providers={providers}/>
  
          <div className="pt-5 w-full">
            {moviesByTopic.map((t) =>
              <div key={t.id} className={t.id === 0 ? "" : "mt-5"}>
                  <div className="flex items-center gap-2">
                      <h1 className={clsx(
                          "inline-block text-lg font-bold text-black dark:bg-gradient-to-r dark:bg-clip-text dark:text-transparent sm:text-2xl",
                          t.color
                      )}>
                          {t.title}
                      </h1>
                      <span className="text-gray-400">|</span>
                      <a href="/search?type=movie&amp;now_playing=true" className="text-xs font-medium text-[rgb(2_120_253/var(--tw-text-opacity,1))] dark:text-[rgb(2_120_253/var(--tw-text-opacity,1))] hover:opacity-90"
                          style={{transition:"opacity 0.2s ease", cursor:"pointer"}}>
                          View All
                      </a>
                  </div>
                  <MovieRow movies={t.movies} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
