import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ title, children, className = "" }: ChartCardProps) {
  return (
    <div className={`chart-card animate-fade-in ${className}`}>
      <h3 className="chart-title">{title}</h3>
      {children}
    </div>
  );
}
