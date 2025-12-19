
import React, { useState } from 'react';
import { 
  Calculator as CalcIcon, RefreshCw, Banknote, CreditCard, 
  X, ChevronRight, Info, CheckCircle2, Tag
} from 'lucide-react';
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

  const handleCalculate = () => {
    const salary = parseInt(salaryInput, 10);
    if (isNaN(salary) || salary === 0) return;

    const existingLoan = parseInt(loanInput, 10) || 0;
    const matched = BRACKETS.find((b) => salary >= b.min && salary <= b.max);
    
    const rate = matched ? matched.rate : 0.35;
    const theoreticalDebtCap = Math.round(salary * rate);
    const finalDebtCap = Math.max(0, theoreticalDebtCap - existingLoan);
    
    let label = '';
    if (matched) {
       if (matched.max === Number.MAX_SAFE_INTEGER) {
         label = "2 000 001 FCFA et plus";
       } else if (matched.min === 0) {
         label = "SMIG - 200 000 FCFA";
       } else {
         label = `${formatNumber(matched.min.toString())} - ${formatNumber(matched.max.toString())} FCFA`;
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
      <div className="w-full max-w-md mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col relative z-10">
        <div className="bg-gradient-to-br from-primary to-primary-dark p-10 text-white relative">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white opacity-20 rounded-full blur-3xl"></div>
          <div className="flex items-center gap-4 mb-2">
             <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/30">
                <CalcIcon className="text-white" size={28} />
             </div>
             <div>
                <h2 className="text-2xl font-black leading-tight tracking-tight">Quotité Cessible</h2>
                <p className="text-sm font-medium opacity-80">Simulation Financière Rapide</p>
             </div>
          </div>
        </div>

        <div className="p-8 pt-10 space-y-8">
          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Salaire Net Mensuel</label>
            <div className="relative group">
              <input 
                type="text" 
                inputMode="numeric"
                value={formatNumber(salaryInput)} 
                onChange={handleSalaryChange} 
                placeholder="Ex: 500 000"
                required
                className="w-full p-6 pl-16 bg-slate-50 border-2 border-transparent rounded-[1.5rem] outline-none focus:border-primary focus:bg-white transition-all text-xl font-extrabold shadow-sm"
              />
              <Banknote className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={28} />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xs uppercase">FCFA</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Mensualité crédits</label>
            <div className="relative group">
              <input 
                type="text" 
                inputMode="numeric"
                value={formatNumber(loanInput)} 
                onChange={handleLoanChange} 
                placeholder="Ex: 0"
                className="w-full p-6 pl-16 bg-slate-50 border-2 border-transparent rounded-[1.5rem] outline-none focus:border-primary focus:bg-white transition-all text-xl font-extrabold shadow-sm"
              />
              <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={28} />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xs uppercase">FCFA</span>
            </div>
          </div>

          <div className="pt-2">
            <button 
              onClick={handleCalculate}
              disabled={!salaryInput || parseInt(salaryInput) === 0}
              className="w-full bg-primary text-white py-6 rounded-[1.5rem] font-black text-xl shadow-[0_20px_40px_-10px_rgba(59,130,246,0.4)] active:scale-[0.96] disabled:opacity-50 disabled:active:scale-100 transition-all flex items-center justify-center gap-3 group"
            >
              Calculer <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-6 font-medium flex items-center justify-center gap-1 uppercase tracking-widest">
              <Info size={10} /> Barèmes réglementaires inclus
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Sheet Modal */}
      {isSheetOpen && result && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsSheetOpen(false)} 
          />
          <div className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] transform transition-transform animate-in slide-in-from-bottom duration-300 ease-out">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-4 mb-2 shrink-0" />
            
            <div className="p-8 pt-4 flex flex-col overflow-y-auto pb-10">
              <div className="flex justify-between items-center mb-6 sticky top-0 bg-white py-2 z-10">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="text-secondary" /> Résultat Analyse
                </h3>
                <button onClick={() => setIsSheetOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Lighter, theme-matched results card (Blue Primary) */}
              <div className="bg-primary/10 rounded-[2rem] p-8 text-center shadow-sm border-2 border-primary/20 shrink-0 mb-6">
                <p className="text-[10px] uppercase font-black tracking-[0.2em] text-primary/70 mb-2">Capacité de remboursement</p>
                <p className="text-4xl font-black text-primary-dark">{CURRENCY_FORMATTER.format(result.finalDebtCap)}</p>
                <p className="text-xs text-primary/60 mt-2 font-medium italic">Libre après vos engagements</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-4">
                  <Tag className="text-primary mt-1" size={20} />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5 tracking-wider">Tranche de salaire</p>
                    <p className="text-lg font-black text-slate-800 leading-none">{result.bracketLabel}</p>
                    <p className="text-xs text-primary-dark font-bold mt-1">Taux d'endettement max : {(result.rate * 100).toFixed(0)}%</p>
                  </div>
                </div>
              </div>

              <div className="w-full shrink-0">
                <ResultChart data={result} />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8 shrink-0">
                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">Quotité Max</p>
                    <p className="text-lg font-black text-slate-700">{CURRENCY_FORMATTER.format(result.theoreticalDebtCap)}</p>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">Détention</p>
                    <p className="text-lg font-black text-secondary-dark">{CURRENCY_FORMATTER.format(result.existingLoan)}</p>
                 </div>
              </div>

              <button 
                onClick={handleReset}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shrink-0 shadow-lg"
              >
                <RefreshCw size={20} /> Nouveau calcul
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calculator;
