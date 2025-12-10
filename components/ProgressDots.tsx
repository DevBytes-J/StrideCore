'use client'

export default function ProgressDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-colors ${
            i <= current ? 'bg-orange-500' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

