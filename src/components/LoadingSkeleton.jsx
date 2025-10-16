import React from 'react'

function Card() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between">
        <div className="h-4 w-40 animate-pulse rounded bg-white/10" />
        <div className="h-6 w-20 animate-pulse rounded-full bg-white/10" />
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="h-16 animate-pulse rounded bg-white/10" />
        <div className="h-16 animate-pulse rounded bg-white/10" />
        <div className="h-16 animate-pulse rounded bg-white/10" />
        <div className="h-16 animate-pulse rounded bg-white/10" />
        <div className="h-16 animate-pulse rounded bg-white/10 col-span-2" />
      </div>
    </div>
  )
}

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Card /><Card /><Card /><Card />
    </div>
  )
}
