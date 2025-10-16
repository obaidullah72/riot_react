import React from 'react'

export default function StatsCard({ stats, displayName }) {
  if (!stats) return null
  const tm = stats.total_matches || 0
  const avgKda = tm ? `${(stats.total_kills/tm).toFixed(1)}/${(stats.total_deaths/tm).toFixed(1)}/${(stats.total_assists/tm).toFixed(1)}` : '—'
  const winRate = tm ? ((stats.wins/tm)*100).toFixed(0) : '0'

  const Stat = ({ label, value, hint, color = '' }) => (
    <div className="glass-card p-4">
      <div className="text-xs text-slate-300">{label}</div>
      <div className={`text-xl font-semibold ${color}`}>{value}</div>
      {hint ? <div className="mt-0.5 text-[11px] text-slate-400">{hint}</div> : null}
    </div>
  )

  return (
    <section className="space-y-4">
      <div className="glass-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{displayName}</h3>
            <p className="text-xs text-slate-300">Matches analyzed: <span className="font-semibold">{tm}</span></p>
          </div>
          {/* Win rate ring */}
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 80 80" className="w-20 h-20 rotate-[-90deg]">
              <circle cx="40" cy="40" r="35" stroke="rgba(255,255,255,.15)" strokeWidth="6" fill="none" />
              <circle
                cx="40" cy="40" r="35"
                stroke="#10b981" strokeWidth="6" fill="none" strokeLinecap="round"
                strokeDasharray={`${winRate} ${100 - winRate}`}
                pathLength="100"
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-sm font-bold">{winRate}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Stat label="Avg K/D/A" value={avgKda} color="text-blue-300" />
        <Stat label="Avg CS" value={tm ? (stats.total_cs/tm).toFixed(1) : '—'} />
        <Stat label="Avg Gold" value={tm ? Math.round(stats.total_gold/tm).toLocaleString() : '—'} />
        <Stat label="Avg Damage" value={tm ? Math.round(stats.total_damage/tm).toLocaleString() : '—'} />
        <Stat label="Win Rate" value={`${winRate}%`} hint={`${stats.wins}/${tm} wins`} color="text-emerald-300" />
      </div>
    </section>
  )
}
