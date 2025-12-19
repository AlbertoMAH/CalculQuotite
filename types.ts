export interface SalaryBracket {
  min: number;
  max: number;
  rate: number;
}

export interface CalculationResult {
  salary: number;
  bracketLabel: string;
  rate: number;
  theoreticalDebtCap: number; // Quotité cessible théorique (Max possible)
  existingLoan: number;       // Montant des prêts en cours
  finalDebtCap: number;       // Quotité disponible réelle (après déduction)
}