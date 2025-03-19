
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative pt-24 pb-20 sm:pt-32 sm:pb-40 overflow-hidden bg-gradient-to-br from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-flex items-center rounded-full px-4 py-1 mb-6 text-sm font-medium bg-blue-50 text-blue-600">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              Eliminate Duplicate Data
            </span>
            
            <h1 className="heading-1 mb-6 text-gradient">
              Manage Data With Intelligence and Precision
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Detect and remove duplicate data automatically, saving storage and improving data quality with our powerful management system.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
              <Link to="/register">
                <Button className="btn-primary h-12 px-8 text-base shadow-blue-200/40">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/help">
                <Button variant="outline" className="btn-outline h-12 px-8 text-base">
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-sm text-slate-600 max-w-xl mx-auto">
              {["Detect Duplicates", "Intuitive Interface", "Data Visualization", "CSV & Excel Support"].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-200 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute top-12 -right-24 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-36 h-36 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
      </div>

      {/* Dashboard preview */}
      <div className={`container mx-auto px-4 sm:px-6 mt-16 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="relative max-w-5xl mx-auto">
          <div className="glass-card rounded-xl shadow-2xl shadow-blue-900/5 overflow-hidden border border-slate-200/60">
            <div className="bg-slate-800 h-8 flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="bg-white p-2">
              <div className="flex flex-col lg:flex-row bg-slate-50 rounded-lg overflow-hidden">
                <div className="w-full lg:w-60 bg-slate-100 p-4 border-r border-slate-200">
                  <div className="h-8 w-36 bg-blue-500 rounded-md mb-4"></div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="h-8 bg-white rounded-md"></div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="bg-white p-4 rounded-lg border border-slate-200 h-24 flex flex-col justify-between">
                        <div className="h-3 w-20 bg-slate-200 rounded"></div>
                        <div className="h-6 w-16 bg-blue-100 rounded"></div>
                      </div>
                    ))}
                  </div>
                  <div className="h-64 bg-white rounded-lg border border-slate-200 p-4">
                    <div className="h-3 w-24 bg-slate-200 rounded mb-4"></div>
                    <div className="h-48 bg-slate-50 rounded flex items-end p-2">
                      <div className="flex h-full items-end space-x-3 w-full">
                        {[60, 30, 80, 40, 50, 70, 20].map((height, i) => (
                          <div 
                            key={i} 
                            className="flex-1 bg-blue-500 rounded-t animate-pulse-slow"
                            style={{ height: `${height}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
