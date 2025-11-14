import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Phone, Mail, XCircle, Video } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function AppointmentCard({ appointment, onCancel }) {
  const isPast = new Date(appointment.dateTime) < new Date();
  const isCancelled = appointment.status === "cancelled";
  const isUpcoming = !isPast && !isCancelled;

  const getBadgeColor = () => {
    if (isCancelled) return "bg-red-100 text-red-700 border-red-200";
    if (isPast) return "bg-gray-100 text-gray-700 border-gray-200";
    return "bg-green-100 text-green-700 border-green-200";
  };

  const getBadgeText = () => {
    if (isCancelled) return "Cancelled";
    if (isPast) return "Completed";
    return "Upcoming";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`p-6 border-0 shadow-lg rounded-2xl overflow-hidden ${
        isCancelled ? "opacity-60" : ""
      }`}>
        {/* Status Badge */}
        <div className="flex justify-between items-start mb-6">
          <Badge className={`${getBadgeColor()} border px-3 py-1 text-sm font-semibold`}>
            {getBadgeText()}
          </Badge>
          {appointment.bookingId && (
            <span className="text-xs text-gray-400 font-mono">#{appointment.bookingId}</span>
          )}
        </div>

        {/* Doctor Info */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 ring-2 ring-cyan-100">
            <img
              src={appointment.doctor.image}
              alt={appointment.doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {appointment.doctor.name}
            </h3>
            <p className="text-cyan-600 font-medium">{appointment.doctor.specialty}</p>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold">{appointment.timeSlot.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-semibold">{appointment.timeSlot.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-sm">{appointment.doctor.location}</p>
            </div>
          </div>
        </div>

        {/* Patient Info */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{appointment.fullName}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-4 h-4 text-gray-400" />
            <span>{appointment.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4 text-gray-400" />
            <span>{appointment.phone}</span>
          </div>
        </div>

        {/* Reason for Visit */}
        {appointment.reason && (
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Reason for Visit</p>
            <p className="text-gray-700 text-sm leading-relaxed">{appointment.reason}</p>
          </div>
        )}

        {/* Actions */}
        {isUpcoming && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-xl border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 h-11"
            >
              <Video className="w-4 h-4 mr-2" />
              Join Video Call
            </Button>
            <Button
              variant="outline"
              onClick={() => onCancel(appointment)}
              className="flex-1 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 h-11"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}

        {isPast && !isCancelled && (
          <Button
            variant="outline"
            className="w-full rounded-xl border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 h-11"
          >
            Book Again
          </Button>
        )}
      </Card>
    </motion.div>
  );
}