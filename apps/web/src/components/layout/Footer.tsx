import { env } from '@/config'
import './Footer.scss'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          {env.appName} v{env.appVersion}
        </p>
        <p className="footer-text">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  )
}
