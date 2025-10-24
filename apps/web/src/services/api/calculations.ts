import { apiClient } from './client'

export interface CalculationInput {
  // Add your calculation input fields here
  monthlyInvocations: number
  averageExecutionTime: number
  memorySize: number
  traditionalServerCost: number
}

export interface CalculationResult {
  // Add your calculation result fields here
  serverlessCost: number
  traditionalCost: number
  savings: number
  roi: number
  paybackPeriod: number
}

/**
 * Calculate ROI based on input parameters
 */
export async function calculateROI(input: CalculationInput): Promise<CalculationResult> {
  const response = await apiClient.post<CalculationResult>('/api/calculations', input)
  return response.data
}

/**
 * Get saved calculations
 */
export async function getCalculations(): Promise<CalculationResult[]> {
  const response = await apiClient.get<CalculationResult[]>('/api/calculations')
  return response.data
}

/**
 * Get calculation by ID
 */
export async function getCalculation(id: string): Promise<CalculationResult> {
  const response = await apiClient.get<CalculationResult>(`/api/calculations/${id}`)
  return response.data
}

/**
 * Delete calculation
 */
export async function deleteCalculation(id: string): Promise<void> {
  await apiClient.delete(`/api/calculations/${id}`)
}
