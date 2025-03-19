
import React from "react";
import FeatureCard from "./FeatureCard";
import AnimatedIcon from "./AnimatedIcon";
import { 
  FileSearch, 
  BarChart3, 
  FileSpreadsheet, 
  Sparkles, 
  Shield, 
  History, 
  Settings, 
  FolderSync 
} from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: FileSearch,
      title: "Duplicate Detection",
      description: "Automatically scan and identify duplicate records across your datasets using advanced matching algorithms."
    },
    {
      icon: BarChart3,
      title: "Visual Insights",
      description: "Gain clear insights through interactive charts and graphs showing data duplication patterns."
    },
    {
      icon: FileSpreadsheet,
      title: "CSV & Excel Support",
      description: "Seamlessly import and export data from various file formats including CSV, Excel, and more."
    },
    {
      icon: Sparkles,
      title: "Smart Suggestions",
      description: "Receive intelligent recommendations for handling duplicates based on your data patterns."
    },
    {
      icon: Shield,
      title: "Data Privacy",
      description: "Your data never leaves your browser, ensuring complete privacy and security."
    },
    {
      icon: History,
      title: "Action History",
      description: "Track all actions taken on your data with a comprehensive history log for complete transparency."
    },
    {
      icon: Settings,
      title: "Customizable Rules",
      description: "Set and adjust duplicate detection rules to match your specific data requirements."
    },
    {
      icon: FolderSync,
      title: "Batch Processing",
      description: "Handle large datasets efficiently with optimized batch processing capabilities."
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-2 mb-4">Powerful Features for Data Management</h2>
          <p className="text-lg text-slate-600">
            Our comprehensive toolset helps you manage, clean, and optimize your data efficiently.
          </p>
        </div>

        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <AnimatedIcon 
              icon={FileSearch} 
              color="text-blue-200" 
              size={48} 
              className="absolute top-20 left-10" 
            />
            <AnimatedIcon 
              icon={BarChart3} 
              color="text-indigo-200" 
              size={36} 
              className="absolute bottom-40 left-1/4" 
            />
            <AnimatedIcon 
              icon={FileSpreadsheet} 
              color="text-sky-200" 
              size={42} 
              className="absolute top-1/3 right-20" 
            />
            <AnimatedIcon 
              icon={Shield} 
              color="text-blue-200" 
              size={32} 
              className="absolute bottom-20 right-1/3" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 z-10 relative">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
