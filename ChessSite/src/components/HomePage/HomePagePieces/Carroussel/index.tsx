
import { useState } from "react"
import { CAROUSEL_ITEMS } from "../../../../models/Site Layout/CarrousselDto"

export function NewsCarousel() {
  const [index, setIndex] = useState(0)
  const item = CAROUSEL_ITEMS[index]

  return (
    <div
      className="h-64 rounded-xl bg-cover bg-center flex items-end p-6 text-white"
      style={{ backgroundImage: `url(${item.imageUrl})` }}
    >
      <div className="bg-black/60 p-4 rounded max-w-md">
        <h2 className="text-2xl font-bold">{item.title}</h2>
        <p className="text-sm opacity-90">{item.subtitle}</p>
        <button className="mt-3 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">
          {item.actionLabel}
        </button>
      </div>

      {/* controls */}
      <div className="absolute right-6 bottom-6 flex gap-2">
        {CAROUSEL_ITEMS.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir para notícia ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
