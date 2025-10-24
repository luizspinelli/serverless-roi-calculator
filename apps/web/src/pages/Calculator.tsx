import { CalculatorForm } from '@/components/forms/CalculatorForm'
import './Calculator.scss'

export function Calculator() {
  return (
    <div className="calculator">
      <div className="calculator-header">
        <h1>ROI Calculator</h1>
        <p>Enter your serverless metrics to calculate the return on investment</p>
      </div>
      <CalculatorForm />
    </div>
  )
}
