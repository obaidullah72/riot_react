import axios from 'axios'

const API_KEY = import.meta.env.VITE_RIOT_API_KEY

if (!API_KEY) {
  console.warn('⚠️ Missing Riot API key in .env.local (VITE_RIOT_API_KEY)')
}

const http = axios.create({
  baseURL: 'https://americas.api.riotgames.com',
  timeout: 20000,
  headers: {
    'X-Riot-Token': API_KEY,
  },
})

async function getWithRetry(url, tries = 3, delayMs = 800) {
  let lastErr
  for (let i = 0; i < tries; i++) {
    try {
      return await http.get(url)
    } catch (err) {
      const status = err?.response?.status
      lastErr = err
      if (status === 429 && i < tries - 1) {
        await new Promise(r => setTimeout(r, delayMs * Math.pow(2, i)))
        continue
      }
      throw err
    }
  }
  throw lastErr
}

export async function fetchAccountByRiotId({ gameName, tagline }) {
  const g = (gameName || '').trim()
  const t = (tagline || '').trim().toUpperCase() 
  const url = `/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(g)}/${encodeURIComponent(t)}`
  const res = await getWithRetry(url)
  return res.data
}

export async function fetchMatchIds({ puuid, count = 10 }) {
  const url = `/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`
  const res = await getWithRetry(url)
  return res.data
}

export async function fetchMatch({ matchId }) {
  const url = `/lol/match/v5/matches/${matchId}`
  const res = await getWithRetry(url)
  return res.data
}
