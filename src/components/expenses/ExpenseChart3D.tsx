
import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

interface PieChartProps {
  expenses: Expense[];
}

// Define category colors for the 3D chart
const categoryColors: Record<string, string> = {
  Food: '#10b981',
  Entertainment: '#8b5cf6',
  Transportation: '#f59e0b',
  Health: '#ef4444',
  Shopping: '#3b82f6',
  Other: '#6b7280',
};

// Individual 3D Pie Slice
const PieSlice = ({ 
  startAngle,
  endAngle, 
  radius = 2.5, 
  height = 0.5, 
  color,
  category,
  percentage,
  index
}: { 
  startAngle: number;
  endAngle: number;
  radius?: number;
  height?: number;
  color: string;
  category: string;
  percentage: number;
  index: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(radius * Math.cos(startAngle), radius * Math.sin(startAngle));
    
    const curve = new THREE.EllipseCurve(
      0, 0,
      radius, radius,
      startAngle, endAngle,
      false, 0
    );
    
    const points = curve.getPoints(32);
    for (const point of points) {
      shape.lineTo(point.x, point.y);
    }
    
    shape.lineTo(0, 0);
    return shape;
  }, [startAngle, endAngle, radius]);

  // Hover animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(Date.now() / 5000) * 0.05;
    }
  });

  // Text position
  const textAngle = startAngle + (endAngle - startAngle) / 2;
  const textRadius = radius * 0.7;
  const textPosition = [
    textRadius * Math.cos(textAngle),
    textRadius * Math.sin(textAngle),
    height + 0.1
  ];

  return (
    <group position={[0, 0, index * 0.02]}>
      <mesh 
        ref={meshRef}
        position={[0, 0, height / 2]}
        castShadow
        receiveShadow
      >
        <extrudeGeometry 
          args={[
            shape, 
            { 
              depth: height, 
              bevelEnabled: false 
            }
          ]} 
        />
        <meshStandardMaterial 
          color={color} 
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
      
      {percentage > 5 && (
        <Text
          position={textPosition as [number, number, number]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {`${category}\n${percentage.toFixed(0)}%`}
        </Text>
      )}
    </group>
  );
};

// The main 3D pie chart component
const PieChart3D = ({ data }: { data: Record<string, number> }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  // Calculate angles for each slice
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);
  let startAngle = 0;
  
  const slices = Object.entries(data).map(([category, amount], index) => {
    const percentage = (amount / total) * 100;
    const angle = (percentage / 100) * Math.PI * 2;
    const endAngle = startAngle + angle;
    
    const slice = (
      <PieSlice 
        key={category}
        startAngle={startAngle}
        endAngle={endAngle}
        color={categoryColors[category] || categoryColors.Other}
        category={category}
        percentage={percentage}
        index={index}
      />
    );
    
    startAngle = endAngle;
    return slice;
  });

  return (
    <group ref={groupRef}>
      {slices}
    </group>
  );
};

// Main component that sets up the Canvas
const ExpenseChart3D: React.FC<PieChartProps> = ({ expenses }) => {
  // Calculate category totals for the pie chart
  const categoryData = useMemo(() => {
    return expenses.reduce((acc: Record<string, number>, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {});
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Add expenses to see the 3D chart</p>
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <pointLight position={[-10, -10, 10]} intensity={0.5} />
        <PieChart3D data={categoryData} />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default ExpenseChart3D;
