import React from 'react'
import { formatUTC } from '../utils/lol'

export default function MatchTabs({ matches = [], current = 0, onPick }) {
  if (!matches.length) return null
  return (
    <section className="mb-4 overflow-x-auto">
      <ul className="flex gap-1 border-b border-white/10 min-w-max glass rounded-t-xl p-2">
        {matches.map((m, i) => (
          <li key={m?.metadata?.matchId} className="-mb-px">
            <button
              onClick={() => onPick?.(i)}
              className={`inline-block py-2.5 px-5 text-sm rounded-t-md transition ${
                i === current
                  ? 'bg-slate-800/80 border-b-2 border-blue-500 text-blue-300 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>Match {i + 1}</span>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-700/70">
                  {formatUTC(m?.info?.gameCreation).slice(0, 10)}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
