import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Calendar } from "lucide-react";

export default function AppointmentChart({ appointments }) {
  // Get monthly data
  const getMonthlyData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentYear = new Date().getFullYear();
    
    const monthlyCount = months.map((month, index) => {
      const count = appointments.filter(apt => {
        const date = new Date(apt.dateTime);
        return date.getMonth() === index && date.getFullYear() === currentYear;
      }).length;
      
      return {
        month,
        appointments: count
      };
    });

    return monthlyCount;
  };

  // Get status distribution
  const getStatusData = () => {
    const now = new Date();
    const upcoming = appointments.filter(apt => 
      apt.status !== "cancelled" && new Date(apt.dateTime) >= now
    ).length;
    const completed = appointments.filter(apt => 
      apt.status !== "cancelled" && new Date(apt.dateTime) < now
    ).length;
    const cancelled = appointments.filter(apt => apt.status === "cancelled").length;

    return [
      { name: "Upcoming", value: upcoming, color: "#06b6d4" },
      { name: "Completed", value: completed, color: "#10b981" },
      { name: "Cancelled", value: cancelled, color: "#ef4444" }
    ].filter(item => item.value > 0);
  };

  const monthlyData = getMonthlyData();
  const statusData = getStatusData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Calendar className="w-7 h-7 text-cyan-600" />
              Appointment Overview
            </h2>
            <p className="text-gray-500 mt-1">Your booking activity this year</p>
          </div>
        </div>

        {appointments.length > 0 ? (
          <div className="space-y-8">
            {/* Bar Chart */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Appointments</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                    }}
                  />
                  <Bar 
                    dataKey="appointments" 
                    fill="url(#colorGradient)" 
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            {statusData.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Appointment Status</h3>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: 'none', 
                          borderRadius: '12px', 
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="ml-8 space-y-3">
                    {statusData.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-700 font-medium">
                          {item.name}: {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No appointment data to display</p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}