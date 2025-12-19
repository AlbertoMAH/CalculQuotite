import { SalaryBracket } from './types';

// Brackets based on the provided Kotlin code
export const BRACKETS: SalaryBracket[] = [
  { min: 2_000_001, max: Number.MAX_SAFE_INTEGER, rate: 0.57 },
  { min: 1_500_001, max: 2_000_000, rate: 0.55 },
  { min: 1_000_001, max: 1_500_000, rate: 0.52 },
  { min: 800_001, max: 1_000_000, rate: 0.48 },
  { min: 600_001, max: 800_000, rate: 0.45 },
  { min: 400_001, max: 600_000, rate: 0.42 },
  { min: 200_001, max: 400_000, rate: 0.38 },
  { min: 0, max: 200_000, rate: 0.35 }
];

export const CURRENCY_FORMATTER = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'XOF',
  maximumFractionDigits: 0,
});