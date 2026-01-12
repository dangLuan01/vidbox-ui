import { Topic } from "@/app/types/topic";

export const topics: Topic[] = [
    {
        id: 1,
        title:"Now Playing",
        media_type:"movie",
        url_topic:"/discover/movie?page=1&sort_by=popularity.desc&release_date.gte=2025-12-09&with_release_type=3|2&include_adult=false",
        color: "dark:from-red-400 dark:to-orange-500",
        priority: 1
    },
    {
        id:2,
        title:"Trending Movies",
        media_type:"",
        url_topic:"/trending/movie/week",
        color: "dark:from-green-400 dark:to-green-800",
        priority: 2
    },
    {
        id:3,
        title:"Trending TV Shows",
        media_type:"",
        url_topic:"/trending/tv/week",
        color: "dark:from-green-400 dark:to-green-800",
        priority: 2
    },
    {
        id:4,
        title:"Netflix Originals",
        media_type:"movie",
        url_topic:"/discover/movie?page=1&sort_by=popularity.desc&with_watch_providers=8&watch_region=US",
        color: "dark:from-red-400 dark:to-red-800",
        priority: 2
    }

]