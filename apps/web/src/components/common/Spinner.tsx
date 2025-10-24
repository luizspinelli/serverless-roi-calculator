import './Spinner.scss'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

export function Spinner({ size = 'md', fullScreen = false }: SpinnerProps) {
  if (fullScreen) {
    return (
      <div className="spinner-overlay">
        <div className={`spinner spinner-${size}`}>
          <div className="spinner-circle" />
        </div>
      </div>
    )
  }

  return (
    <div className={`spinner spinner-${size}`}>
      <div className="spinner-circle" />
    </div>
  )
}
