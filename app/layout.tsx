import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solar Living',
  description: 'Boutique property management in Umag, Croatia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
