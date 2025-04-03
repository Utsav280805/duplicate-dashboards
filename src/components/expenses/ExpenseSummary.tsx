
import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const summary = useMemo(() => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Calculate category totals
    const categories = expenses.reduce((acc: Record<string, number>, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {});
    
    // Find highest category
    let highestCategory = { name: "None", amount: 0 };
    Object.entries(categories).forEach(([name, amount]) => {
      if (amount > highestCategory.amount) {
        highestCategory = { name, amount: amount as number };
      }
    });
    
    // Count this month's expenses
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const monthlyTotal = expenses.reduce((sum, expense) => {
      const expenseDate = new Date(expense.date);
      if (expenseDate.getMonth() === thisMonth && expenseDate.getFullYear() === thisYear) {
        return sum + expense.amount;
      }
      return sum;
    }, 0);
    
    return {
      total,
      categories,
      highestCategory,
      monthlyTotal,
      count: expenses.length,
    };
  }, [expenses]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Expense Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white shadow-lg"
        >
          <h3 className="text-sm font-medium opacity-80">Total Expenses</h3>
          <p className="text-3xl font-bold">${summary.total.toFixed(2)}</p>
          <p className="text-xs mt-2 opacity-80">{summary.count} transactions</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white shadow-lg"
        >
          <h3 className="text-sm font-medium opacity-80">This Month</h3>
          <p className="text-3xl font-bold">${summary.monthlyTotal.toFixed(2)}</p>
          <p className="text-xs mt-2 opacity-80">Current monthly spending</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white shadow-lg"
        >
          <h3 className="text-sm font-medium opacity-80">Highest Category</h3>
          <p className="text-3xl font-bold">{summary.highestCategory.name}</p>
          <p className="text-xs mt-2 opacity-80">${summary.highestCategory.amount.toFixed(2)}</p>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white shadow-lg"
        >
          <h3 className="text-sm font-medium opacity-80">Average Expense</h3>
          <p className="text-3xl font-bold">
            ${summary.count > 0 ? (summary.total / summary.count).toFixed(2) : "0.00"}
          </p>
          <p className="text-xs mt-2 opacity-80">Per transaction</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
