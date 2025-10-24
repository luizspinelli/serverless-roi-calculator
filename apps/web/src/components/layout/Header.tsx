import { Link, useLocation } from 'react-router-dom'
import { env } from '@/config'
import './Header.scss'

export function Header() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-title">
          {env.appName}
        </Link>
        <nav className="header-nav">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/calculator"
            className={`nav-link ${isActive('/calculator') ? 'active' : ''}`}
          >
            Calculator
          </Link>
          <Link
            to="/scenarios"
            className={`nav-link ${isActive('/scenarios') ? 'active' : ''}`}
          >
            Scenarios
          </Link>
        </nav>
      </div>
    </header>
  )
}
