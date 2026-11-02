# VEER — Chat. Call. Share in true HD.

A modern chat app with a dark `#121212` theme and neon green `#7CFF7A` accents.
Built with **Expo / React Native 0.85**, with a matching marketing site and
installable PWA.

## ✨ App features (5 screens)

| Screen | What's inside |
|---|---|
| **Welcome** | Custom SVG VEER logo (V + lightning bolt), glowing GET STARTED button |
| **Signup** | Name / phone / password validation, Firebase-auth hook point |
| **Chat list** | Asha + 7 contacts, live online-status dots, unread badges, search, All/Unread/Groups tabs |
| **1-to-1 video call** | Pulsing LIVE indicator, call timer, self PiP tile, mute/camera/flip/end |
| **Group video (4-way)** | 2×2 tile grid with active-speaker neon highlighting |
| **HD media sharing** | HD badge on every item, "zero compression, up to 2 GB" banner, multi-select send |

## 📁 Repo layout

```
app/                  Expo React Native app (source)
  App.js              state-driven navigation
  screens/            Welcome, Signup, ChatList, VideoCall, GroupCall, Media
  components/         VeerLogo (SVG), Avatar (initials + online dot)
  data/contacts.js    seed contacts (Firebase-shaped)
web/                  fastify backend + marketing site + PWA
  index.js            API: POST /api/waitlist → waitlist.csv
  public/index.html   landing page with store buttons → email popup
  app/                installable PWA build of the Expo app (served at /app/)
```

## 🚀 Run the app

```bash
cd app
pnpm install
pnpm start
```

Open in Expo Go, or run the web build: `pnpm web`.

## 🌐 Live links

- **Marketing site**: https://26548db3b034bca66afb1592ac8084ea4202184e47a3ab717fc09c76d5936c3.fly.dev
- **Installable PWA**: …/app/ — "Install VEER" prompt or Share → Add to Home Screen

## 🛠 Backend

fastify + SQLite-ready, waitlist emails stored to `web/waitlist.csv`.
The site is iframe-friendly (no X-Frame-Options / frame-ancestors).

## 📄 License

See [LICENSE](app/LICENSE).
