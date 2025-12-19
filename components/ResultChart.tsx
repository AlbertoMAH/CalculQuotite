
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CalculationResult } from '../types';

interface ResultChartProps {
  data: CalculationResult;
}

const ResultChart: React.FC<ResultChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Engagé', value: data.existingLoan, color: '#10b981' }, // Secondary (Green)
    { name: 'Disponible', value: data.finalDebtCap, color: '#3b82f6' }, // Primary (Blue)
  ].filter(d => d.value > 0);

  if (chartData.length === 0) return null;

  return (
    <div className="w-full h-56 my-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={75}
            paddingAngle={8}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => new Intl.NumberFormat('fr-FR').format(value) + ' FCFA'}
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultChart;
