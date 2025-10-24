import { env } from '@/config'
import './Header.scss'

export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">{env.appName}</h1>
        <nav className="header-nav">
          {/* Navigation links will go here */}
        </nav>
      </div>
    </header>
  )
}
