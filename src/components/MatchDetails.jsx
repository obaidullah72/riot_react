import React, { useMemo } from 'react'
import { buildTeamTotals, formatUTC, queueName, secondsToMin, cs, kdaClass } from '../utils/lol'

export default function MatchDetails({ match, summonerName, region, puuid }) {
  const info = match?.info || {}
  const me = info.participants?.find(p => p.puuid === puuid)
  const teamTotals = useMemo(() => buildTeamTotals(info), [info])

  return (
    <section className="space-y-6">
      {/* Meta */}
      <div className="glass rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <i className="fas fa-info-circle text-blue-400" /> Match Details
            </h2>
            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="text-amber-300 font-semibold">{summonerName}</span>
              <span className="px-2 py-1 rounded-full bg-slate-700/60 text-slate-200 text-xs">{region}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{formatUTC(info.gameCreation)}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-slate-400">Match ID</p>
              <p className="font-mono text-slate-200">{match?.metadata?.matchId}</p>
            </div>
            <div>
              <p className="text-slate-400">Duration</p>
              <p className="text-slate-200">{secondsToMin(info.gameDuration)} min</p>
            </div>
            <div>
              <p className="text-slate-400">Version</p>
              <p className="text-slate-200">{info.gameVersion}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-6">
          <div>
            <p className="text-slate-400">Game Mode</p>
            <p className="text-slate-200">{info.gameMode}</p>
          </div>
          <div>
            <p className="text-slate-400">Queue</p>
            <p className="text-slate-200">{queueName(info.queueId)}</p>
          </div>
          <div>
            <p className="text-slate-400">Map</p>
            <p className="text-slate-200">Summoner&apos;s Rift</p>
          </div>
        </div>
      </div>

      {/* Teams Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(info.teams || []).map(team => (
          <div key={team.teamId} className="glass rounded-2xl overflow-hidden border border-white/10">
            <div className={`px-6 py-4 ${team.win ? 'bg-emerald-500/10 border-l-4 border-emerald-500' : 'bg-rose-500/10 border-l-4 border-rose-500'}`}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Team {team.teamId}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${team.win ? 'bg-emerald-600/20 text-emerald-300' : 'bg-rose-600/20 text-rose-300'}`}>
                  {team.win ? 'Victory' : 'Defeat'}
                </span>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <p className="text-slate-400 text-sm">Kills</p>
                  <p className="font-bold text-white">{team?.objectives?.champion?.kills ?? 0}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Turrets</p>
                  <p className="font-bold text-white">{team?.objectives?.tower?.kills ?? 0}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Gold</p>
                  <p className="font-bold text-white">{(teamTotals?.[team.teamId]?.total_gold ?? 0).toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-slate-400 text-sm">Dragons</p>
                  <p className="font-bold text-white">{team?.objectives?.dragon?.kills ?? 0}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Barons</p>
                  <p className="font-bold text-white">{team?.objectives?.baron?.kills ?? 0}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Heralds</p>
                  <p className="font-bold text-white">{team?.objectives?.riftHerald?.kills ?? 0}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Participants */}
      <div className="glass rounded-2xl overflow-hidden border border-white/10">
        <div className="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <h3 className="text-base font-semibold">
            <i className="fas fa-users text-purple-400 mr-2" />
            Participants
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[920px] w-full">
            <thead className="sticky top-0 z-10 bg-slate-800/80 backdrop-blur">
              <tr className="text-left text-slate-300 text-xs uppercase tracking-wide">
                <th className="py-3 px-4">Summoner</th>
                <th className="py-3 px-4">Champion</th>
                <th className="py-3 px-4">Level</th>
                <th className="py-3 px-4">K/D/A</th>
                <th className="py-3 px-4">CS</th>
                <th className="py-3 px-4">Gold</th>
                <th className="py-3 px-4">Damage</th>
              </tr>
            </thead>
            <tbody>
              {(info.participants || []).map(p => {
                const total = p?.totalDamageDealtToChampions || 0
                const phys = p?.physicalDamageDealtToChampions || 0
                const magic = p?.magicDamageDealtToChampions || 0
                const trueD = p?.trueDamageDealtToChampions || 0
                return (
                  <tr key={p.puuid} className={`${p.puuid === puuid ? 'bg-blue-500/10 border-l-2 border-blue-400' : 'hover:bg-white/5'}`}>
                    <td className="py-3 px-4">
                      <div className="font-medium">
                        {p.puuid === puuid ? (
                          <>
                            {summonerName} <span className="text-blue-400"><i className="fas fa-user" /></span>
                          </>
                        ) : (p.summonerName ?? 'Unknown')}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-700 grid place-items-center text-[11px] border border-white/10">
                          {(p.championName || '?').slice(0, 1)}
                        </div>
                        <span>{p.championName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{p.champLevel}</td>
                    <td className={`py-3 px-4 font-semibold ${kdaClass(p.kills, p.deaths)}`}>
                      {p.kills}/{p.deaths}/{p.assists}
                      <div className="text-xs text-slate-400">{(p?.challenges?.kda ?? 0).toFixed(2)} KDA</div>
                    </td>
                    <td className="py-3 px-4">
                      {cs(p)}
                      <div className="text-xs text-slate-400">{(p?.challenges?.csPerMinute ?? 0).toFixed(1)}/min</div>
                    </td>
                    <td className="py-3 px-4">
                      {(p.goldEarned ?? 0).toLocaleString()}
                      <div className="text-xs text-slate-400">{Math.round(p?.challenges?.goldPerMinute ?? 0)}/min</div>
                    </td>
                    <td className="py-3 px-4">
                      {(total).toLocaleString()}
                      <div className="text-xs text-slate-400">{Math.round(p?.challenges?.damagePerMinute ?? 0)}/min</div>

                      <div className="w-full mt-1 flex gap-px overflow-hidden rounded">
                        {total > 0 ? (
                          <>
                            <div className="h-1.5 bg-blue-500" style={{ width: `${(phys/total)*100}%` }} />
                            <div className="h-1.5 bg-purple-500" style={{ width: `${(magic/total)*100}%` }} />
                            <div className="h-1.5 bg-amber-500" style={{ width: `${(trueD/total)*100}%` }} />
                          </>
                        ) : (
                          <div className="h-1.5 w-full bg-slate-700" />
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-2 border-t border-white/10 bg-white/5 text-sm text-slate-300">
          Showing {info.participants?.length ?? 0} participants
        </div>
      </div>
    </section>
  )
}
