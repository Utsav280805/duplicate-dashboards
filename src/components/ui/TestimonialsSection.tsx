
import React from "react";
import TestimonialCard from "./TestimonialCard";

const TestimonialsSection = () => {
  const testimonials = [
    {
      content:
        "This tool has revolutionized how we handle our customer databases. We found over 5,000 duplicate entries that were cluttering our system!",
      author: "Emma Thompson",
      role: "CRM Manager",
      company: "Retail Solutions Inc."
    },
    {
      content:
        "As a data analyst, I needed a reliable way to clean our datasets. This platform not only identified duplicates but provided insights I wasn't even looking for.",
      author: "Michael Chen",
      role: "Senior Data Analyst",
      company: "DataTech Analytics"
    },
    {
      content:
        "The visualization tools helped us understand our data duplication patterns. We've reduced storage costs by 30% after cleaning our systems.",
      author: "Sophia Rodriguez",
      role: "IT Director",
      company: "Global Services Ltd."
    },
    {
      content:
        "Implementing this solution was effortless. The interface is intuitive and the duplicate detection is remarkably accurate even with our complex datasets.",
      author: "James Wilson",
      role: "Database Administrator",
      company: "Tech Innovations"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-2 mb-4">Trusted by Data Professionals</h2>
          <p className="text-lg text-slate-600">
            See what our users are saying about their experience with our data management solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="opacity-0 animate-slide-in" 
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              <TestimonialCard
                content={testimonial.content}
                author={testimonial.author}
                role={testimonial.role}
                company={testimonial.company}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
