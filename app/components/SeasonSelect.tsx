"use client"

import * as React from "react"
import { ChevronsUpDown, Check } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Episode, Season } from "../types/movie"

interface SeasonSelectProps {
    id: number
    seasons?: Season[]
    onEpisodesChange: (episodes: Episode[]) => void
}
export function SeasonSelect({ id, seasons, onEpisodesChange }: SeasonSelectProps) {
    const [open, setOpen] = React.useState(false)
    const [selected, setSelected] = React.useState<Season | null>(null)   

    React.useEffect(() => { 
      const defaultSeason = seasons?.find((s) => s.season_number === 1) 
      if (defaultSeason) { 
        setSelected(defaultSeason) 
        fetch(`/api/season/${id}/${defaultSeason.season_number}?language=en-US`) 
        .then(res => res.json()) 
        .then(onEpisodesChange)
      } 
    }, [id, seasons])

    const handleSelect = (season: Season) => { 
      setSelected(season) 
      setOpen(false) 
      fetch(`/api/season/${id}/${season.season_number}?language=en-US`) 
      .then(res => res.json()) 
      .then(onEpisodesChange)
    }  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[160px] justify-between"
        >
          {selected ? selected.name : "Select season"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 max-h-120 overflow-y-auto">
        <Command>
          <CommandGroup>
            {seasons?.map((season) => (
              <CommandItem
                key={season.season_number}
                value={season.name}
                onSelect={() => {
                  handleSelect(season)
                }}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    selected?.season_number === season.season_number
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
                {season.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
