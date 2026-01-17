import Footer from "../components/Footer"
import HeaderWatch from "../components/HeaderWatch"
import FilterSearch from "../components/FilterSearch"
import { GenreService } from "../services/genreService"
import { ProviderService } from "../services/providerService"
import { SearchService } from "../services/searchService"

export default async function Search() {
   
    const genreService      = new GenreService()
    const providerService   = new ProviderService()
    const searchService     = new SearchService()
    const [genres, networks, countries] = await Promise.all([
        genreService.getGenres("movie", "en-US"),
        providerService.getMovieProviders("en-US"),
        searchService.getCountry()
    ]) 

    
    return (
    <>
    <HeaderWatch />
    <div className="mx-auto w-full max-w-[1440px] pt-20 space-y-4 px-4 md:px-6 lg:px-8 py-6 min-h-[80vh]">
        <FilterSearch genres={genres} networks={networks} countries={countries}/>
    </div>
    <Footer />
    </>
    )
}