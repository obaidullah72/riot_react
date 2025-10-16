import React from 'react'

function formatUTC(ms) {
  if (!ms) return '—'
  const d = new Date(ms)
  return d.toISOString().replace('T',' ').replace('.000Z',' UTC')
}
function secondsToMin(sec) {
  if (!sec) return '0.0'
  return (sec / 60).toFixed(1)
}

export default function Matches({ matches = [], displayName }) {
  if (!matches.length) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {matches.map(m => {
        const info = m?.info || {}
        const id = m?.metadata?.matchId
        const started = formatUTC(info.gameCreation)
        const mins = secondsToMin(info.gameDuration)
        const mine = (info.participants || []).find(
          p => `${p.riotIdGameName}#${p.riotIdTagline}` === displayName
        )

        const kda = mine ? `${mine.kills}/${mine.deaths}/${mine.assists}` : '—'
        const cs = mine ? (mine.totalMinionsKilled + mine.neutralMinionsKilled) : '—'
        const dmg = mine ? mine.totalDamageDealtToChampions : '—'
        const gold = mine ? mine.goldEarned : '—'
        const resultLabel = mine ? (mine.win ? 'Victory' : 'Defeat') : '—'
        const resultColor = mine ? (mine.win ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' : 'bg-rose-500/20 text-rose-300 border-rose-400/30') : 'bg-white/5 text-slate-300 border-white/10'

        return (
          <div key={id} className="glass-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{id}</div>
                <div className="text-xs text-slate-300">{started}</div>
                <div className="mt-1 text-xs text-slate-400">Queue: {info.queueId}</div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs border ${resultColor}`}>
                {resultLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] text-slate-400">K / D / A</div>
                <div className="text-base font-semibold">{kda}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] text-slate-400">Duration</div>
                <div className="text-base font-semibold">{mins} min</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] text-slate-400">CS</div>
                <div className="text-base font-semibold">{cs !== '—' ? cs : '—'}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] text-slate-400">Gold</div>
                <div className="text-base font-semibold">
                  {gold !== '—' ? Number(gold).toLocaleString() : '—'}
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 col-span-2">
                <div className="text-[11px] text-slate-400">Damage to Champs</div>
                <div className="text-base font-semibold">{dmg !== '—' ? Number(dmg).toLocaleString() : '—'}</div>
                <div className="mt-2 h-1.5 rounded bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded bg-blue-400/80"
                    style={{ width: dmg && dmg > 0 ? `${Math.min(100, (dmg / 30000) * 100)}%` : '8%' }}
                  />
                </div>
              </div>
            </div>

            <details className="mt-3">
              <summary className="cursor-pointer select-none text-sm font-medium hover:underline">
                Raw JSON
              </summary>
              <pre className="mt-2 max-h-64 overflow-auto rounded bg-black/30 p-3 text-xs leading-relaxed">
                {JSON.stringify(m, null, 2)}
              </pre>
            </details>
          </div>
        )
      })}
    </div>
  )
}
