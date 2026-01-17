"use client"

import { useRouter } from "next/navigation"
import { Play } from "lucide-react";

export default function MoviePlayButton({url}: {url: string}) {
    const router = useRouter()

    return (
        <button  onClick={() => router.push(url)} className="inline-flex items-center justify-center whitespace-nowrap text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow h-10 rounded-md mr-4 border border-white bg-white px-6 py-2 font-bold text-black transition-transform hover:scale-110 hover:bg-gray-200">
            <Play className="fill-black pr-1" />
            Play
        </button>
      
    )
}