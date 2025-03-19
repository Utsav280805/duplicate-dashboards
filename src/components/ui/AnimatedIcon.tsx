
import React from "react";
import { LucideIcon } from "lucide-react";

interface AnimatedIconProps {
  icon: LucideIcon;
  color?: string;
  size?: number;
  className?: string;
}

const AnimatedIcon = ({ 
  icon: Icon, 
  color = "text-blue-500", 
  size = 24,
  className = ""
}: AnimatedIconProps) => {
  return (
    <div className={`animate-float ${className}`}>
      <Icon size={size} className={color} />
    </div>
  );
};

export default AnimatedIcon;
