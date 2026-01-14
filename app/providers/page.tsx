import Link from "next/link"
import Footer from "../components/Footer"
import HeaderWatch from "../components/HeaderWatch"
import { ProviderService } from "../services/providerService"

export default async function Search() {
    const providerService = new ProviderService()
    const providers = await providerService.getMovieProviders("en-US")

    return (
    <>
    <HeaderWatch />
    <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-8 pt-20 pb-12 min-h-screen space-y-4 bg-base-100 dark:bg-base-900 overflow-y-hidden">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Streaming Providers</h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-10 gap-6">
            {providers.map((provider) => (
            <Link className="group block h-[111px] w-[111px] overflow-hidden rounded-lg hover:opacity-90 transition-all relative" href={`/search?page=1&network=${provider.provider_id}`}>
                <div className="absolute inset-0 scale-[1.2]" style={{backgroundImage:`url(${provider.logo_path})`, backgroundPosition:"center", filter:"brightness(1.4) blur(16px)"}}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-[70px] w-[70px] rounded-full overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                        <img src={provider.logo_path} alt={provider.provider_name} width="70" height="70" className="h-full w-full object-cover" loading="lazy" decoding="async"/>
                    </div>
                </div>
            </Link>
            ))}
        </div>
    </div>
    <Footer />
    </>
    )
}