# 🧠 Riot Stats — React + Vite + Tailwind v4

This project is a **League of Legends match-analyzer** built with **React 19**, **Vite 7**, and **Tailwind CSS v4**.  
It fetches player data directly from the **Riot Games API** (no proxy) to display:

- Player lookup by **Riot ID** (`GameName#TagLine`)
- Per-match **summary tables**, sortable and clickable
- **Detailed match views** with teams, objectives, and participants
- A modern **glass-morphism UI** powered by Tailwind v4 gradients and utility classes

---

## 🚀 Tech Stack

| Category | Tech |
|-----------|------|
| Frontend Framework | **React 19** |
| Build Tool | **Vite 7** |
| Styling | **Tailwind CSS v4** |
| Icons | **Font Awesome 6** |
| API | **Riot Games Developer API** |
| HTTP Client | **Axios** |

---

## 🛠️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/riot-stats.git
cd riot-stats
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

```bash
cp .env.example .env.local
```

Then add your Riot API key:

```env
VITE_RIOT_API_KEY=your-riot-api-key-here
```

### 4. Run the development server

```bash
npm run dev
```

Server will start at **[http://localhost:5173](http://localhost:5173)**

### 5. Build for production

```bash
npm run build
```

---

## ⚙️ Project Structure

```
riot_app/
├── src/
│   ├── components/
│   │   ├── SearchForm.jsx
│   │   ├── StatsCard.jsx
│   │   ├── MatchSummaryTable.jsx
│   │   ├── MatchTabs.jsx
│   │   ├── MatchDetails.jsx
│   │   ├── LoadingSkeleton.jsx
│   ├── services/
│   │   └── riot.js
│   ├── utils/
│   │   └── lol.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── vite.config.js
├── package.json
└── README.md
```

---

## 🧩 Environment Variables

| Key                 | Description                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------- |
| `VITE_RIOT_API_KEY` | Your **Riot Games API key** from [developer.riotgames.com](https://developer.riotgames.com) |

> ⚠️ Never commit your real API key — `.env` and `.env.local` are ignored by Git.

---

## 🧪 Example Usage

1. Open the app
2. Enter **Riot ID** → `Frost` and **Tagline** → `NA4`
3. View recent matches, click a row, and explore details like:

   * K/D/A, CS, Gold, Damage
   * Team objectives and totals
   * Participant stats with color-coded performance bars

---

## 🎨 UI Highlights

* Dynamic **glass cards** and gradient headers
* Responsive grid layout (mobile → desktop)
* Color-coded KDA and win/lose indicators
* Smooth tab switching animations
* Fully styled with **Tailwind v4** — zero PostCSS config

---

## 🔍 Linting & Formatting

Uses **ESLint v9** with React Hooks + Refresh plugins.

Run manually:

```bash
npm run lint
```

---

## 📦 Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start Vite dev server    |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## 🧰 Troubleshooting

**Error:** `Can't resolve 'tailwindcss'`
→ Ensure Tailwind and plugin are installed:

```bash
npm i -D tailwindcss @tailwindcss/vite
```

**Error:** `Data not found – No results for Forst#NA4`
→ Typo in Riot ID (should be **Frost#NA4**).

---

## ⚖️ Disclaimer

> Not affiliated with Riot Games or League of Legends.
> Data provided via the [Riot Games API](https://developer.riotgames.com) under their Terms of Service.

---

## 🪪 License

This project is open-source under the **MIT License**.
You’re free to modify, distribute, and build upon it for personal or commercial use.

---

### 💙 Author

Built by **Obaidullah**
📧 obaidullah3372@gmail.com
🌐 [\[GitHub Profile Link\]](https://github.com/obaidullah72)
