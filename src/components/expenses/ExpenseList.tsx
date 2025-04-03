
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

// Category color map
const categoryColors: Record<string, string> = {
  Food: "bg-green-100 text-green-800",
  Entertainment: "bg-purple-100 text-purple-800",
  Transportation: "bg-yellow-100 text-yellow-800",
  Health: "bg-red-100 text-red-800",
  Shopping: "bg-blue-100 text-blue-800",
  Other: "bg-gray-100 text-gray-800",
};

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No expenses found. Add some!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Expenses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-right">Amount</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            <AnimatePresence>
              {expenses.map((expense) => (
                <motion.tr 
                  key={expense.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div className="font-medium">{expense.title}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${categoryColors[expense.category] || "bg-gray-100 text-gray-800"}`}>
                      {expense.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {formatDistanceToNow(new Date(expense.date), { addSuffix: true })}
                  </td>
                  <td className="py-3 px-4 text-right font-medium">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button 
                      onClick={() => onDeleteExpense(expense.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Delete expense"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
