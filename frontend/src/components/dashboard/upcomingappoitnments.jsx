import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

export default function UpcomingAppointments({ appointments }) {
  const now = new Date();
  const upcomingAppointments = appointments
    .filter(apt => apt.status !== "cancelled" && new Date(apt.dateTime) >= now)
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Appointments</h2>
          <Link to={createPageUrl("MyAppointments")}>
            <Button variant="ghost" className="text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-4 p-4 bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl hover:shadow-md transition-shadow"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={appointment.doctor.image}
                    alt={appointment.doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 mb-1">{appointment.doctor.name}</h3>
                  <Badge className="bg-cyan-100 text-cyan-700 border-0 mb-2 text-xs">
                    {appointment.doctor.specialty}
                  </Badge>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-cyan-600" />
                      <span>{appointment.timeSlot.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{appointment.timeSlot.time}</span>
                    </div>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg"
                >
                  View
                </Button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No upcoming appointments</p>
            <Link to={createPageUrl("DoctorBooking")}>
              <Button className="bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-xl">
                Book Appointment
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </motion.div>
  );
}