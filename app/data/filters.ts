import { Popular, Type } from "../types/filter";

export const types: Type[] = [
    {
        value: "all",
        name: "Type"
    },
    {
        value: "movie",
        name: "Movie"
    },
    {
        value: "tv",
        name: "TV"
    },
]

export const populars: Popular[] = [
    {
        value: "popularity.desc",
        name: "Popular"
    },
    {
        value: "top_rated",
        name: "Top Rated"
    },
    {
        value: "riginal_title.asc",
        name: "Title A-Z"
    },
    {
        value: "original_title.desc",
        name: "Title Z-A"
    },
    {
        value: "primary_release_date.desc",
        name: "Latest Release"
    },
    {
        value: "primary_release_date.asc",
        name: "Oldest Release"
    },
    {
        value: "vote_count.desc",
        name: "Most Voted"
    },
    {
        value: "revenue.desc",
        name: "Revenue"
    },
]