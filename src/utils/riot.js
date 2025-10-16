const REGION_TO_HOST = {
  NA1: 'americas', BR1: 'americas', LA1: 'americas', LA2: 'americas', OC1: 'americas',
  EUW1: 'europe', EUN1: 'europe', TR1: 'europe', RU: 'europe',
  KR: 'asia', JP1: 'asia',
}

export function resolveHost(platformCode = 'NA1') {
  const key = String(platformCode || '').toUpperCase()
  return REGION_TO_HOST[key] || 'americas'
}

export function formatUTC(ms) {
  if (!ms) return '—'
  const d = new Date(ms)
  return d.toISOString().replace('T', ' ').replace('.000Z', ' UTC')
}

export function secondsToMin(sec) {
  if (!sec) return '0.0'
  return (sec / 60).toFixed(1)
}
