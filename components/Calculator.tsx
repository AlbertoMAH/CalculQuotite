
import React, { useState } from 'react';
import { Calculator as CalcIcon, RefreshCw, Banknote, Wallet, CreditCard, X, ChevronRight, ArrowUpRight, Info } from 'lucide-react';
import { BRACKETS, CURRENCY_FORMATTER } from '../constants.ts';
import { CalculationResult } from '../types.ts';
import ResultChart from './ResultChart.tsx';

const Calculator: React.FC = () => {
  const [salaryInput, setSalaryInput] = useState<string>('');
  const [loanInput, setLoanInput] = useState<string>('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalaryInput(e.target.value.replace(/\D/g, ''));
  };

  const handleLoanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanInput(e.target.value.replace(/\D/g, ''));
  };

  const formatNumber = (val: string) => {
    if (!val) return '';
    return new Intl.NumberFormat('fr-FR').format(parseInt(val, 10));
  };

  const currentSalary = parseInt(salaryInput, 10) || 0;
  const currentMatched = currentSalary > 0 
    ? BRACKETS.find((b) => currentSalary >= b.min && currentSalary <= b.max) 
    : null;
  const currentRate = currentMatched ? Math.round(currentMatched.rate * 100) : 0;

  const handleCalculate = () => {
    const salary = parseInt(salaryInput, 10);
    if (isNaN(salary) || salary === 0) return;

    const existingLoan = parseInt(loanInput, 10) || 0;
    const matched = BRACKETS.find((b) => salary >= b.min && salary <= b.max);
    
    const rate = matched ? matched.rate : 0;
    const theoreticalDebtCap = Math.round(salary * rate);
    const finalDebtCap = Math.max(0, theoreticalDebtCap - existingLoan);
    
    let label = '';
    if (matched) {
       if (matched.max === Number.MAX_SAFE_INTEGER) {
         label = `≥ ${new Intl.NumberFormat('fr-FR').format(matched.min)} FCFA`;
       } else {
         label = `${new Intl.NumberFormat('fr-FR').format(matched.min)} - ${new Intl.NumberFormat('fr-FR').format(matched.max)} FCFA`;
       }
    }

    setResult({
      salary,
      bracketLabel: label,
      rate,
      theoreticalDebtCap,
      existingLoan,
      finalDebtCap
    });
    setIsSheetOpen(true);
  };

  const handleReset = () => {
    setSalaryInput('');
    setLoanInput('');
    setResult(null);
    setIsSheetOpen(false);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-primary px-6 py-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="relative z-10 flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <CalcIcon size={24} className="text-white" />
            </div>
            <h2 className="text-xl font-bold tracking-wide">Quotité Cessible</h2>
          </div>
          <p className="text-primary-100 text-sm font-medium opacity-90">
            Remplissez le formulaire pour calculer votre capacité.
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label htmlFor="salary" className="block text-sm font-semibold text-slate-700 ml-1">
              Salaire mensuel (Net)
            </label>
            <div className="relative group">
              <input
                id="salary"
                type="text"
                inputMode="numeric"
                value={formatNumber(salaryInput)}
                onChange={handleSalaryChange}
                placeholder="Ex: 500 000"
                className="w-full py-4 pl-11 pr-24 text-lg font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none shadow-sm"
              />
              <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400">
                <Banknote size={20} />
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm font-bold">
                FCFA
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="loan" className="block text-sm font-semibold text-slate-700 ml-1 flex justify-between">
              <span>Mensualité crédits en cours</span>
            </label>
            <div className="relative group">
              <input
                id="loan"
                type="text"
                inputMode="numeric"
                value={formatNumber(loanInput)}
                onChange={handleLoanChange}
                placeholder="Ex: 50 000"
                className="w-full py-4 pl-11 pr-24 text-lg font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none shadow-sm"
              />
              <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400">
                <CreditCard size={20} />
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm font-bold">
                FCFA
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleCalculate}
              disabled={!salaryInput || parseInt(salaryInput) === 0}
              className={`
                w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-lg text-white shadow-lg
                ${!salaryInput || parseInt(salaryInput) === 0 ? 'bg-slate-300' : 'bg-primary hover:bg-indigo-700 active:scale-[0.98]'}
              `}
            >
              <span>Calculer ma quotité</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {isSheetOpen && result && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsSheetOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="font-bold text-lg text-slate-800">Résultat</h3>
              <button onClick={() => setIsSheetOpen(false)} className="p-2 text-slate-400"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="bg-primary p-6 rounded-2xl text-white mb-6 text-center">
                <p className="text-xs uppercase opacity-80 mb-1">Capacité Mensuelle</p>
                <p className="text-3xl font-bold">{CURRENCY_FORMATTER.format(result.finalDebtCap)}</p>
              </div>
              <ResultChart data={result} />
              <button onClick={handleReset} className="w-full mt-6 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                <RefreshCw size={18} /> Nouveau calcul
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calculator;
