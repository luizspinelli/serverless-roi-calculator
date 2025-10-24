import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Spinner } from '@/components'
import { useCalculation } from '@/contexts/CalculationContext'
import { useCalculationForm } from '@/hooks'
import './CalculatorForm.scss'

// Zod validation schema
const calculationSchema = z.object({
  monthlyInvocations: z
    .number({ required_error: 'Monthly invocations is required' })
    .min(1, 'Must be at least 1')
    .positive('Must be a positive number'),
  averageExecutionTime: z
    .number({ required_error: 'Execution time is required' })
    .min(1, 'Must be at least 1ms')
    .positive('Must be a positive number'),
  memorySize: z
    .number({ required_error: 'Memory size is required' })
    .min(128, 'Minimum memory is 128MB')
    .max(10240, 'Maximum memory is 10240MB'),
  traditionalServerCost: z
    .number({ required_error: 'Traditional server cost is required' })
    .min(0, 'Must be zero or greater')
    .nonnegative('Cannot be negative'),
})

type CalculationFormData = z.infer<typeof calculationSchema>

export function CalculatorForm() {
  const { isLoading } = useCalculation()
  const { submitCalculation, error } = useCalculationForm()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CalculationFormData>({
    resolver: zodResolver(calculationSchema),
    defaultValues: {
      monthlyInvocations: 1000000,
      averageExecutionTime: 200,
      memorySize: 512,
      traditionalServerCost: 500,
    },
  })

  const onSubmit = async (data: CalculationFormData) => {
    await submitCalculation(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="calculator-form">
      <div className="form-group">
        <label htmlFor="monthlyInvocations">
          Monthly Invocations
          <span className="required">*</span>
        </label>
        <input
          id="monthlyInvocations"
          type="number"
          {...register('monthlyInvocations', { valueAsNumber: true })}
          className={errors.monthlyInvocations ? 'error' : ''}
          disabled={isLoading}
        />
        {errors.monthlyInvocations && (
          <span className="error-message">{errors.monthlyInvocations.message}</span>
        )}
        <span className="help-text">Number of function invocations per month</span>
      </div>

      <div className="form-group">
        <label htmlFor="averageExecutionTime">
          Average Execution Time (ms)
          <span className="required">*</span>
        </label>
        <input
          id="averageExecutionTime"
          type="number"
          {...register('averageExecutionTime', { valueAsNumber: true })}
          className={errors.averageExecutionTime ? 'error' : ''}
          disabled={isLoading}
        />
        {errors.averageExecutionTime && (
          <span className="error-message">{errors.averageExecutionTime.message}</span>
        )}
        <span className="help-text">Average function execution time in milliseconds</span>
      </div>

      <div className="form-group">
        <label htmlFor="memorySize">
          Memory Size (MB)
          <span className="required">*</span>
        </label>
        <input
          id="memorySize"
          type="number"
          {...register('memorySize', { valueAsNumber: true })}
          className={errors.memorySize ? 'error' : ''}
          disabled={isLoading}
        />
        {errors.memorySize && (
          <span className="error-message">{errors.memorySize.message}</span>
        )}
        <span className="help-text">Allocated memory for the function (128-10240 MB)</span>
      </div>

      <div className="form-group">
        <label htmlFor="traditionalServerCost">
          Traditional Server Cost (USD/month)
          <span className="required">*</span>
        </label>
        <input
          id="traditionalServerCost"
          type="number"
          step="0.01"
          {...register('traditionalServerCost', { valueAsNumber: true })}
          className={errors.traditionalServerCost ? 'error' : ''}
          disabled={isLoading}
        />
        {errors.traditionalServerCost && (
          <span className="error-message">{errors.traditionalServerCost.message}</span>
        )}
        <span className="help-text">Current monthly cost of traditional infrastructure</span>
      </div>

      {error && (
        <div className="form-error">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="form-actions">
        <button
          type="button"
          onClick={() => reset()}
          disabled={isLoading}
          className="btn-secondary"
        >
          Reset
        </button>
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? (
            <>
              <Spinner size="sm" />
              <span>Calculating...</span>
            </>
          ) : (
            'Calculate ROI'
          )}
        </button>
      </div>
    </form>
  )
}
