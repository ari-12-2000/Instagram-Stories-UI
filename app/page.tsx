'use client'

import { useEffect, useRef, useState } from 'react'
import StoryViewer from '@/components/StoryViewer'

export default function Page() {
  const [stories, setStories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    fetch('/data/stories.json')
      .then(res => res.json())
      .then(data => {
        setStories(data)
        setLoading(false)
      })
  }, [])

  return (
    <main className="my-6 max-w-sm mx-auto min-h-[80vh] flex items-center">
      <div className="relative w-full">
        {/* LEFT BUTTON */}
        <button
          onClick={() => {
            containerRef.current?.scrollBy({
              left: -120,
              behavior: 'smooth'
            })
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10
               w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center"
        >
          ‹
        </button>

        {/* STORY STRIP */}
        <div
          ref={containerRef}
          className="flex gap-4 px-8 overflow-x-hidden"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-24 h-48 rounded-lg shimmer shrink-0"
              >
                {/* name shimmer */}
                <div className="mt-2 h-3 w-20 mx-auto rounded shimmer" />
              </div>
            ))
            : stories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => setActiveIndex(index)}
                className="flex flex-col items-center shrink-0"
              >
                <div className="w-24 h-48 rounded-lg border-2 border-blue-500 p-[2px]">
                  <img
                    src={story.image}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </div>
                <span className="text-xs text-white mt-1">
                  {story.name}
                </span>
              </button>
            ))}
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => {
            containerRef.current?.scrollBy({
              left: 120,
              behavior: 'smooth'
            })
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10
               w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center"
        >
          ›
        </button>
      </div>

      {/* FULLSCREEN VIEWER */}
      {activeIndex !== null && (
        <StoryViewer
          stories={stories}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          setIndex={setActiveIndex}
        />
      )}
    </main>
  )
}
