
import React from "react";

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
}

const TestimonialCard = ({
  content,
  author,
  role,
  company,
  avatarUrl
}: TestimonialCardProps) => {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col h-full p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="mb-4">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400 inline-block"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <blockquote className="flex-1 mb-5">
        <p className="text-slate-700 leading-relaxed">"{content}"</p>
      </blockquote>

      <div className="flex items-center">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={author}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold mr-3">
            {initials}
          </div>
        )}
        <div>
          <p className="font-semibold text-slate-900">{author}</p>
          <p className="text-sm text-slate-500">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
