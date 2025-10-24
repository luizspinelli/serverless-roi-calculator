import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import { ToastProvider } from '@/components/common/ToastProvider'
import { CalculationProvider } from '@/contexts/CalculationContext'
import './App.scss'

function App() {
  return (
    <CalculationProvider>
      <RouterProvider router={router} />
      <ToastProvider />
    </CalculationProvider>
  )
}

export default App
