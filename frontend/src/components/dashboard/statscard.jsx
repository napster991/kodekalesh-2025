import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const colorClasses = {
  cyan: {
    bg: "bg-cyan-100",
    text: "text-cyan-600",
    gradient: "from-cyan-500 to-cyan-600"
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    gradient: "from-blue-500 to-blue-600"
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    gradient: "from-green-500 to-green-600"
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    gradient: "from-purple-500 to-purple-600"
  }
};

export default function StatsCard({ title, value, icon: Icon, color = "cyan", trend }) {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 border-0 shadow-lg rounded-2xl bg-white overflow-hidden relative">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${colors.gradient} opacity-10 rounded-full transform translate-x-12 -translate-y-12`} />
        
        <div className="relative">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center`}>
              <Icon className={`w-7 h-7 ${colors.text}`} />
            </div>
          </div>

          <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
          <p className="text-4xl font-bold text-gray-900 mb-2">{value}</p>
          
          {trend && (
            <div className="flex items-center gap-1">
              <TrendingUp className={`w-4 h-4 ${colors.text}`} />
              <span className={`text-sm font-medium ${colors.text}`}>{trend}</span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}