'use client'

import { useEffect, useState } from 'react'

export default function StoryViewer({
  stories,
  index,
  setIndex,
  onClose
}: any) {
  const [imageLoaded, setImageLoaded] = useState(false)

  // Auto advance
  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < stories.length - 1) {
        setIndex(index + 1)
      } else {
        onClose()
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [index])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* IMAGE */}
      {!imageLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-800" />
      )}

      <img
        src={stories[index].image}
        className="w-full h-full object-contain"
        onLoad={() => setImageLoaded(true)}
      />

      {/* LEFT TAP */}
      <div
        className="absolute left-0 top-0 w-1/2 h-full"
        onClick={() => index > 0 && setIndex(index - 1)}
      />

      {/* RIGHT TAP */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full"
        onClick={() =>
          index < stories.length - 1
            ? setIndex(index + 1)
            : onClose()
        }
      />

      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl"
      >
        ✕
      </button>

      {/* PROGRESS BAR */}
      <div className="absolute top-2 left-2 right-2 h-1 bg-gray-600 rounded">
        <div className="h-full bg-white animate-[progress_5s_linear]" />
      </div>
    </div>
  )
}
