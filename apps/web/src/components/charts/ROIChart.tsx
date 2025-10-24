import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './ROIChart.scss'

interface ROIChartProps {
  serverlessCost: number
  traditionalCost: number
}

export function ROIChart({ serverlessCost, traditionalCost }: ROIChartProps) {
  const data = [
    {
      name: 'Traditional',
      cost: traditionalCost,
    },
    {
      name: 'Serverless',
      cost: serverlessCost,
    },
  ]

  return (
    <div className="roi-chart">
      <h3>Cost Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => `$${value.toFixed(2)}`}
          />
          <Legend />
          <Bar dataKey="cost" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
