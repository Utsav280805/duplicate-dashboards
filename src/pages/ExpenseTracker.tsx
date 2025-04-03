
import React, { useState } from "react";
import { motion } from "framer-motion";
import ExpenseForm from "@/components/expenses/ExpenseForm";
import ExpenseList from "@/components/expenses/ExpenseList";
import ExpenseSummary from "@/components/expenses/ExpenseSummary";
import ExpenseChart3D from "@/components/expenses/ExpenseChart3D";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

// Mock data for the frontend demo
const initialExpenses = [
  { id: "1", title: "Groceries", amount: 85.75, category: "Food", date: new Date().toISOString() },
  { id: "2", title: "Netflix Subscription", amount: 12.99, category: "Entertainment", date: new Date(Date.now() - 86400000).toISOString() },
  { id: "3", title: "Gas", amount: 45.50, category: "Transportation", date: new Date(Date.now() - 172800000).toISOString() },
  { id: "4", title: "Dinner", amount: 65.32, category: "Food", date: new Date(Date.now() - 259200000).toISOString() },
  { id: "5", title: "Gym Membership", amount: 29.99, category: "Health", date: new Date(Date.now() - 345600000).toISOString() },
];

const ExpenseTracker = () => {
  const { isAuthenticated } = useAuth();
  const [expenses, setExpenses] = useState(initialExpenses);
  const [filter, setFilter] = useState("all");

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const addExpense = (expense: { title: string; amount: number; category: string }) => {
    const newExpense = {
      id: Math.random().toString(),
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: new Date().toISOString(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Filter expenses
  const filteredExpenses = filter === "all" 
    ? expenses 
    : expenses.filter(expense => expense.category === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Expense Tracker</h1>
          <p className="text-gray-600">Track and visualize your expenses with 3D charts</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-1 bg-white rounded-lg shadow p-6"
          >
            <ExpenseForm onAddExpense={addExpense} />
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Filter Expenses</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-full text-sm ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilter("Food")}
                  className={`px-4 py-2 rounded-full text-sm ${filter === "Food" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                  Food
                </button>
                <button 
                  onClick={() => setFilter("Entertainment")}
                  className={`px-4 py-2 rounded-full text-sm ${filter === "Entertainment" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                  Entertainment
                </button>
                <button 
                  onClick={() => setFilter("Transportation")}
                  className={`px-4 py-2 rounded-full text-sm ${filter === "Transportation" ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                  Transportation
                </button>
                <button 
                  onClick={() => setFilter("Health")}
                  className={`px-4 py-2 rounded-full text-sm ${filter === "Health" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                  Health
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2"
          >
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <ExpenseSummary expenses={expenses} />
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 h-80 mb-6">
              <h3 className="text-lg font-semibold mb-4">Expense Visualization</h3>
              <ExpenseChart3D expenses={expenses} />
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 bg-white rounded-lg shadow p-6"
        >
          <ExpenseList expenses={filteredExpenses} onDeleteExpense={deleteExpense} />
        </motion.div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
