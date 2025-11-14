import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, XCircle, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function RecentActivity({ appointments }) {
  const recentActivity = appointments
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const getActivityIcon = (appointment) => {
    if (appointment.status === "cancelled") {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
    const isPast = new Date(appointment.dateTime) < new Date();
    if (isPast) {
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }
    return <Calendar className="w-5 h-5 text-cyan-500" />;
  };

  const getActivityText = (appointment) => {
    if (appointment.status === "cancelled") {
      return "Cancelled appointment";
    }
    const isPast = new Date(appointment.dateTime) < new Date();
    if (isPast) {
      return "Completed appointment";
    }
    return "Booked appointment";
  };

  const getActivityColor = (appointment) => {
    if (appointment.status === "cancelled") {
      return "text-red-600";
    }
    const isPast = new Date(appointment.dateTime) < new Date();
    if (isPast) {
      return "text-green-600";
    }
    return "text-cyan-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>

        {recentActivity.length > 0 ? (
          <div className="space-y-4">
            {recentActivity.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start gap-4 pb-4 border-b last:border-b-0"
              >
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 mt-1">
                  {getActivityIcon(appointment)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 mb-1">
                    {getActivityText(appointment)}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    with {appointment.doctor.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(appointment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>

                <Badge 
                  variant="outline" 
                  className={`${getActivityColor(appointment)} border-current text-xs`}
                >
                  {appointment.timeSlot.date.split(',')[0]}
                </Badge>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No recent activity</p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}