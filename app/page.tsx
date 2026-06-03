import { SpeedInsights } from '@vercel/speed-insights/next'

export default function HomePage() {
  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-content">
          <p className="section-tag">Performance Monitoring</p>
          <h1>PostyBridges Performance Dashboard</h1>
          <p>Track page performance directly in your Next.js app with Vercel Speed Insights.</p>
        </div>
      </section>

      <section className="speed-insights-section">
        <h2>Speed Insights</h2>
        <SpeedInsights />
      </section>
    </main>
  )
}
