const fastify = require("fastify")({ logger: true })
const path = require("path")
const fs = require("fs")

fastify.register(require("@fastify/cors"), { origin: true })

// No helmet / no X-Frame-Options — the site is previewed inside an iframe on omni-coder.com

fastify.register(require("@fastify/static"), { root: path.join(__dirname, "public") })

const WAITLIST_CSV = path.join(__dirname, "waitlist.csv")

// Create the CSV with a header row on first boot
if (!fs.existsSync(WAITLIST_CSV)) {
  fs.writeFileSync(WAITLIST_CSV, "email,platform,timestamp\n")
}

// Notify-me popup on the marketing site posts here; emails land in waitlist.csv
fastify.post("/api/waitlist", async (req, reply) => {
  const { email, platform } = req.body || {}
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return reply.code(400).send({ ok: false, error: "Please enter a valid email address." })
  }
  const row = `${String(email).replace(/[",\n]/g, "")},${platform === "ios" ? "ios" : platform === "android" ? "android" : "any"},${new Date().toISOString()}\n`
  fs.appendFileSync(WAITLIST_CSV, row)
  return { ok: true, message: "You're on the list! We'll email you when VEER launches." }
})

fastify.get("/api/health", async () => ({ ok: true, app: "VEER" }))

fastify.listen({ port: 3000, host: "0.0.0.0" })
