import { createContext, useContext, useState, ReactNode } from 'react'
import type { CalculationResult } from '@/services'

interface CalculationContextType {
  currentCalculation: CalculationResult | null
  savedCalculations: CalculationResult[]
  isLoading: boolean
  setCurrentCalculation: (calculation: CalculationResult | null) => void
  setSavedCalculations: (calculations: CalculationResult[]) => void
  setIsLoading: (loading: boolean) => void
  addCalculation: (calculation: CalculationResult) => void
  removeCalculation: (index: number) => void
  clearAll: () => void
}

const CalculationContext = createContext<CalculationContextType | undefined>(undefined)

interface CalculationProviderProps {
  children: ReactNode
}

export function CalculationProvider({ children }: CalculationProviderProps) {
  const [currentCalculation, setCurrentCalculation] = useState<CalculationResult | null>(null)
  const [savedCalculations, setSavedCalculations] = useState<CalculationResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addCalculation = (calculation: CalculationResult) => {
    setSavedCalculations((prev) => [...prev, calculation])
  }

  const removeCalculation = (index: number) => {
    setSavedCalculations((prev) => prev.filter((_, i) => i !== index))
  }

  const clearAll = () => {
    setCurrentCalculation(null)
    setSavedCalculations([])
  }

  const value: CalculationContextType = {
    currentCalculation,
    savedCalculations,
    isLoading,
    setCurrentCalculation,
    setSavedCalculations,
    setIsLoading,
    addCalculation,
    removeCalculation,
    clearAll,
  }

  return (
    <CalculationContext.Provider value={value}>
      {children}
    </CalculationContext.Provider>
  )
}

export function useCalculation() {
  const context = useContext(CalculationContext)
  if (context === undefined) {
    throw new Error('useCalculation must be used within a CalculationProvider')
  }
  return context
}
