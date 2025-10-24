import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { calculateROI, CalculationInput } from '@/services'
import { useCalculation } from '@/contexts/CalculationContext'
import { showToast } from '@/utils'

export function useCalculationForm() {
  const navigate = useNavigate()
  const { setCurrentCalculation, addCalculation, setIsLoading } = useCalculation()
  const [error, setError] = useState<string | null>(null)

  const submitCalculation = async (input: CalculationInput) => {
    setError(null)
    setIsLoading(true)

    try {
      const result = await calculateROI(input)
      setCurrentCalculation(result)
      addCalculation(result)
      showToast.success('Calculation completed successfully!')
      navigate('/results')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to calculate ROI'
      setError(errorMessage)
      showToast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    submitCalculation,
    error,
  }
}
