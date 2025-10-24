import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import './MainLayout.scss'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  )
}
