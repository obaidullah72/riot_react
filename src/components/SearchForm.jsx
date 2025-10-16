import React, { useState } from 'react'

export default function SearchForm({ onSubmit, loading }) {
  const [gameName, setGameName] = useState('')
  const [tagline, setTagline] = useState('')
  const [count, setCount] = useState(10)

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ gameName, tagline, count: Number(count) || 10 })
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-1">Player Information</h3>
      <p className="text-slate-300 text-sm mb-4">
        Enter Riot ID (e.g., <span className="font-mono">Frost</span> + <span className="font-mono">NA4</span>) and how many matches to fetch.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Game Name */}
        <div className="float-wrap">
          <input
            placeholder=" "
            value={gameName}
            onChange={e=>setGameName(e.target.value)}
            required
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-slate-100 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
          />
          <label>Game Name</label>
        </div>

        {/* Tagline */}
        <div className="float-wrap">
          <input
            placeholder=" "
            value={tagline}
            onChange={e=>setTagline(e.target.value.toUpperCase())}
            required
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-slate-100 uppercase outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
          />
          <label>Tagline (e.g., NA4)</label>
        </div>

        {/* Count */}
        <div className="float-wrap">
          <input
            type="number" min="1" max="20"
            placeholder=" "
            value={count}
            onChange={e=>setCount(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-slate-100 outline-none focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
          />
          <label>How many matches?</label>
        </div>

        {/* Submit */}
        <div className="flex items-end">
          <button
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl btn-grad px-4 py-3 font-semibold text-white shadow-md hover:shadow-lg transition pulse disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin" />
                Loading...
              </>
            ) : (
              <>
                <i className="fa-solid fa-magnifying-glass" />
                Search
              </>
            )}
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-3">
        Double-check spelling. Common mistakes: using platform (<code>NA1</code>) instead of tagline (<code>NA4</code>),
        or swapping letters (<code>Frost</code> vs <code>Forst</code>).
      </p>
    </form>
  )
}
