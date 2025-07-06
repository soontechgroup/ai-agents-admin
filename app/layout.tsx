import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'

export const metadata = {
  title: 'AI Agents Admin',
  description: 'AI Agents Administration Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}