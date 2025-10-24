import { useNavigate } from 'react-router-dom'
import { useCalculation } from '@/contexts/CalculationContext'
import { ROIChart } from '@/components/charts/ROIChart'
import { ArrowLeft, Download, Save } from 'lucide-react'
import './Results.scss'

export function Results() {
  const navigate = useNavigate()
  const { currentCalculation } = useCalculation()

  if (!currentCalculation) {
    return (
      <div className="results">
        <div className="results-empty">
          <h2>No Calculation Results</h2>
          <p>Please run a calculation first to see results.</p>
          <button onClick={() => navigate('/calculator')} className="btn-primary">
            <ArrowLeft size={20} />
            Go to Calculator
          </button>
        </div>
      </div>
    )
  }

  const { serverlessCost, traditionalCost, savings, roi, paybackPeriod } = currentCalculation

  return (
    <div className="results">
      <div className="results-header">
        <button onClick={() => navigate('/calculator')} className="btn-back">
          <ArrowLeft size={20} />
          Back to Calculator
        </button>
        <h1>ROI Results</h1>
        <p>Analysis of your serverless vs traditional infrastructure costs</p>
      </div>

      <div className="results-metrics">
        <div className="metric-card">
          <h3>Serverless Cost</h3>
          <p className="metric-value">${serverlessCost.toFixed(2)}</p>
          <span className="metric-label">per month</span>
        </div>

        <div className="metric-card">
          <h3>Traditional Cost</h3>
          <p className="metric-value">${traditionalCost.toFixed(2)}</p>
          <span className="metric-label">per month</span>
        </div>

        <div className="metric-card highlight">
          <h3>Monthly Savings</h3>
          <p className="metric-value savings">${savings.toFixed(2)}</p>
          <span className="metric-label">{((savings / traditionalCost) * 100).toFixed(1)}% reduction</span>
        </div>

        <div className="metric-card">
          <h3>ROI</h3>
          <p className="metric-value">{roi.toFixed(1)}%</p>
          <span className="metric-label">return on investment</span>
        </div>

        <div className="metric-card">
          <h3>Payback Period</h3>
          <p className="metric-value">{paybackPeriod.toFixed(1)}</p>
          <span className="metric-label">months</span>
        </div>
      </div>

      <ROIChart serverlessCost={serverlessCost} traditionalCost={traditionalCost} />

      <div className="results-actions">
        <button className="btn-secondary">
          <Save size={20} />
          Save Scenario
        </button>
        <button className="btn-secondary">
          <Download size={20} />
          Export Report
        </button>
      </div>
    </div>
  )
}
