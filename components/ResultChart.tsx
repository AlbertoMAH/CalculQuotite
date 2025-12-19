import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CalculationResult } from '../types';

interface ResultChartProps {
  data: CalculationResult;
}

const ResultChart: React.FC<ResultChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Prêt en cours', value: data.existingLoan, color: '#f59e0b' }, // Amber 500
    { name: 'Capacité dispo.', value: data.finalDebtCap, color: '#4f46e5' }, // Primary Indigo
  ].filter(d => d.value > 0);

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => new Intl.NumberFormat('fr-FR').format(value) + ' FCFA'}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center text-sm text-slate-500 mt-[-10px]">
        Répartition de la quotité
      </div>
    </div>
  );
};

export default ResultChart;