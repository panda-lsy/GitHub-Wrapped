import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  color?: string;
}

export default function StatsCard({ title, value, icon: Icon, description, color = "text-blue-500" }: Props) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex items-start justify-between hover:bg-gray-800/70 transition-colors">
      <div>
        <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        {description && <p className="text-xs text-gray-500 mt-2">{description}</p>}
      </div>
      <div className={`p-3 rounded-lg bg-gray-700/30 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
