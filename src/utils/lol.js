export function formatUTC(ms) {
  if (!ms) return '—'
  const d = new Date(ms)
  return d.toISOString().replace('T', ' ').replace('.000Z', ' UTC')
}

export function secondsToMin(sec) {
  if (!sec && sec !== 0) return '0.0'
  return (sec / 60).toFixed(1)
}

export function queueName(id) {
  const map = {
    400: 'Normal Draft',
    420: 'Ranked Solo',
    440: 'Ranked Flex',
    450: 'ARAM',
  }
  return map[id] || String(id ?? '—')
}

export function kdaClass(k, d) {
  if (k > d) return 'text-emerald-400'
  if (k === d) return 'text-amber-400'
  return 'text-rose-400'
}

export function cs(m) {
  return (m?.totalMinionsKilled || 0) + (m?.neutralMinionsKilled || 0)
}

export function buildTeamTotals(matchInfo) {
  const totals = {}
  const norm = (tid) => (tid === 0 ? 100 : tid === 1 ? 200 : tid)

  for (const p of matchInfo?.participants || []) {
    const teamId = norm(p?.teamId)
    const bucket = (totals[teamId] ||= { total_gold: 0, total_damage: 0 })
    bucket.total_gold += p?.goldEarned || 0
    bucket.total_damage += p?.totalDamageDealtToChampions || 0
  }
  if (totals[100] && !totals[0]) totals[0] = totals[100]
  if (totals[200] && !totals[1]) totals[1] = totals[200]
  return totals
}
