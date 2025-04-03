
import React from "react";
import HeroSection from "@/components/ui/HeroSection";
import FeatureSection from "@/components/ui/FeatureSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";
import CTASection from "@/components/ui/CTASection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();

  // If user is authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureSection />
        
        {/* New Expense Tracker Promo Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                >
                  Introducing Our New 3D Expense Tracker
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-blue-100 mb-6"
                >
                  Track your expenses with our beautiful 3D visualizations and analytics.
                  Simple, intuitive, and perfect for your financial management needs.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link to="/expenses" className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                    Try Expense Tracker <ChevronRight size={18} />
                  </Link>
                </motion.div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="md:w-1/2"
              >
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1011&q=80" 
                    alt="Expense Tracker Preview" 
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
