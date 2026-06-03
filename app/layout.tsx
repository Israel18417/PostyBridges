import type { Metadata } from 'next'
import '../src/style.css'

export const metadata: Metadata = {
  title: 'PostyBridges | Automotive Technology, GPS Tracking & Security',
  description:
    'PostyBridges provides premium automotive technology upgrades, GPS tracking, and vehicle connectivity solutions for modern cars.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
