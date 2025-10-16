import React from 'react'
import { formatUTC, cs, kdaClass } from '../utils/lol'

export default function MatchSummaryTable({ matches = [], puuid, onPick }) {
  if (!matches.length) return null

  return (
    <section className="glass rounded-2xl overflow-hidden mb-6 border border-white/10">
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-white/5">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <i className="fas fa-table text-blue-400" /> Per-Match Summary
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full">
          <thead className="sticky top-0 z-10 bg-slate-800/80 backdrop-blur">
            <tr className="text-left text-slate-300 text-xs uppercase tracking-wide">
              <th className="py-3 px-4">Match ID</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Champion</th>
              <th className="py-3 px-4">KDA</th>
              <th className="py-3 px-4">CS</th>
              <th className="py-3 px-4">Gold</th>
              <th className="py-3 px-4">Damage</th>
              <th className="py-3 px-4">Win</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, i) => {
              const info = match?.info || {}
              const me = info.participants?.find(p => p.puuid === puuid)
              const mid = match?.metadata?.matchId
              return (
                <tr
                  key={mid}
                  className="group hover:bg-white/5 cursor-pointer"
                  onClick={() => onPick?.(i)}
                >
                  <td className="py-3 px-4 font-mono text-blue-300">{mid}</td>
                  <td className="py-3 px-4">{formatUTC(info.gameCreation)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-700 grid place-items-center text-[11px] border border-white/10">
                        {(me?.championName || '?').slice(0, 1)}
                      </div>
                      <span>{me?.championName ?? '—'}</span>
                    </div>
                  </td>
                  <td className={`py-3 px-4 font-semibold ${kdaClass(me?.kills ?? 0, me?.deaths ?? 0)}`}>
                    {me ? `${me.kills}/${me.deaths}/${me.assists}` : '—'}
                  </td>
                  <td className="py-3 px-4">{me ? cs(me) : '—'}</td>
                  <td className="py-3 px-4">{me ? (me.goldEarned ?? 0).toLocaleString() : '—'}</td>
                  <td className="py-3 px-4">{me ? (me.totalDamageDealtToChampions ?? 0).toLocaleString() : '—'}</td>
                  <td className="py-3 px-4">
                    {me ? (
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        me.win ? 'bg-emerald-600/20 text-emerald-300' : 'bg-rose-600/20 text-rose-300'
                      }`}>
                        {me.win ? 'Yes' : 'No'}
                      </span>
                    ) : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2 border-t border-white/10 bg-white/5 text-sm text-slate-300">
        Showing {matches.length} matches
      </div>
    </section>
  )
}
