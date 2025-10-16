import React, { useState } from 'react'
import SearchForm from './components/SearchForm.jsx'
import StatsCard from './components/StatsCard.jsx'
import Matches from './components/Matches.jsx'          
import MatchSummaryTable from './components/MatchSummaryTable.jsx'
import MatchTabs from './components/MatchTabs.jsx'
import MatchDetails from './components/MatchDetails.jsx'
import LoadingSkeleton from './components/LoadingSkeleton.jsx'
import { fetchAccountByRiotId, fetchMatchIds, fetchMatch } from './services/riot.js'

export default function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [region] = useState('AMERICAS')
  const [puuid, setPuuid] = useState('')
  const [matches, setMatches] = useState([])
  const [stats, setStats] = useState(null)
  const [current, setCurrent] = useState(0)

  async function onSearch({ gameName, tagline, count }) {
    setLoading(true)
    setError('')
    setMatches([])
    setStats(null)
    setCurrent(0)

    const g = (gameName || '').trim()
    const t = (tagline || '').trim().toUpperCase()
    setDisplayName(`${g}#${t}`)

    try {
      const account = await fetchAccountByRiotId({ gameName: g, tagline: t })
      const userPuuid = account?.puuid
      if (!userPuuid) throw new Error('PUUID not found')
      setPuuid(userPuuid)

      const ids = await fetchMatchIds({ puuid: userPuuid, count: count || 10 })
      if (!ids?.length) throw new Error('No matches found')

      const batchSize = 5
      const results = []
      for (let i = 0; i < ids.length; i += batchSize) {
        const chunk = ids.slice(i, i + batchSize)
        const got = await Promise.all(chunk.map(id => fetchMatch({ matchId: id }).catch(() => null)))
        results.push(...got.filter(Boolean))
      }
      setMatches(results)

      const agg = {
        total_matches: 0, total_kills: 0, total_deaths: 0, total_assists: 0,
        total_gold: 0, total_damage: 0, total_cs: 0, wins: 0,
      }

      for (const m of results) {
        const ps = m?.info?.participants || []
        const mine = ps.find(p => p.puuid === userPuuid)
        if (!mine) continue
        agg.total_matches += 1
        agg.total_kills += mine.kills || 0
        agg.total_deaths += mine.deaths || 0
        agg.total_assists += mine.assists || 0
        agg.total_gold += mine.goldEarned || 0
        agg.total_damage += mine.totalDamageDealtToChampions || 0
        agg.total_cs += (mine.totalMinionsKilled || 0) + (mine.neutralMinionsKilled || 0)
        agg.wins += mine.win ? 1 : 0
      }
      setStats(agg)
    } catch (e) {
      const status = e?.response?.status
      const called = e?.config?.baseURL ? `${e.config.baseURL}${e.config.url}` : e?.config?.url
      if (status === 404) {
        let hint = ''
        if (/forst/i.test(displayName)) hint = ' Did you mean "Frost"?'
        setError(`No results for Riot ID ${displayName}.${hint}${called ? `\n(API check: ${called})` : ''}`)
      } else {
        const msg = e?.response?.data?.status?.message || e?.message || 'Request failed'
        setError(`${msg}${called ? `\n(API: ${called})` : ''}`)
      }
    } finally {
      setLoading(false)
    }
  }

  const selectedMatch = matches[current]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="container-app mx-auto px-6 pt-10 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-purple-500 grid place-items-center shadow-lg">
              <span className="text-xl font-bold">LS</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight brand">League Stats</h1>
              <p className="text-slate-300 text-sm mt-1">Advanced match analysis for League of Legends</p>
            </div>
          </div>
          <span className="text-xs md:text-sm text-slate-400 hidden md:inline">Not affiliated with Riot Games</span>
        </div>
      </header>

      {/* Intro */}
      <div className="container-app mx-auto px-6">
        <div className="glass rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-semibold mb-2">Find Your Match History</h2>
          <p className="text-slate-300">
            Enter your <strong className="text-amber-300">Game Name</strong> and <strong className="text-purple-300">Tagline</strong> (e.g., <em>Frost</em> + <em>NA4</em>). We call the <code className="px-1 bg-white/10 rounded">americas</code> Riot API directly.
          </p>
          {!import.meta.env.VITE_RIOT_API_KEY && (
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
              <strong className="font-semibold">Missing API key:</strong> set
              <code className="mx-1 rounded bg-white/10 px-1">VITE_RIOT_API_KEY</code> in
              <code className="ml-1 rounded bg-white/10 px-1">.env.local</code>.
            </div>
          )}
        </div>
      </div>

      {/* Search / Results */}
      <main className="container-app mx-auto px-6 pb-12 space-y-6">
        <SearchForm onSubmit={onSearch} loading={loading} />

        {error && (
          <pre className="whitespace-pre-wrap glass-card p-4 text-sm text-rose-200 border border-rose-500/30">{error}</pre>
        )}

        {stats && <StatsCard stats={stats} displayName={displayName} />}

        {loading ? (
          <LoadingSkeleton />
        ) : matches.length > 0 ? (
          <>
            {/* Per-match table (click row to pick tab) */}
            <MatchSummaryTable matches={matches} puuid={puuid} onPick={setCurrent} />

            {/* Tabs */}
            <MatchTabs matches={matches} current={current} onPick={setCurrent} />

            {/* Details for selected match */}
            {selectedMatch && (
              <MatchDetails
                match={selectedMatch}
                summonerName={displayName}
                region={region}
                puuid={puuid}
              />
            )}
          </>
        ) : null}
      </main>

      <footer className="container-app mx-auto px-6 pb-8 pt-6 text-center text-slate-400 text-xs">
        © 2025 League Stats — For personal use. Data provided by Riot Games API.
      </footer>
    </div>
  )
}
