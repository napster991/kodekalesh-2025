import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, Clock, User, Mail, Phone, MapPin, Download, Eye } from "lucide-react";

export default function BookingConfirmation({ bookingDetails, onNewBooking }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <Card className="max-w-2xl w-full border-0 shadow-2xl rounded-3xl overflow-hidden">
        {/* Success Header */}
        <div className="bg-linear-to-r from-green-500 to-emerald-500 text-white p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <CheckCircle2 className="w-14 h-14 text-green-500" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-3">Booking Confirmed!</h1>
          <p className="text-green-50 text-lg">
            Your appointment has been successfully scheduled
          </p>
        </div>

        {/* Booking Details */}
        <div className="p-10 bg-white">
          <div className="space-y-6">
            {/* Doctor Info */}
            <div className="flex items-center gap-4 pb-6 border-b">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                <img
                  src={bookingDetails.doctor.image}
                  alt={bookingDetails.doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{bookingDetails.doctor.name}</h3>
                <p className="text-cyan-600 font-medium">{bookingDetails.doctor.specialty}</p>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <Calendar className="w-5 h-5 text-cyan-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Date</div>
                  <div className="font-semibold text-gray-900">{bookingDetails.timeSlot.date}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <Clock className="w-5 h-5 text-cyan-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Time</div>
                  <div className="font-semibold text-gray-900">{bookingDetails.timeSlot.time}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <MapPin className="w-5 h-5 text-cyan-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Location</div>
                  <div className="font-semibold text-gray-900">{bookingDetails.doctor.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <User className="w-5 h-5 text-cyan-600 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm text-gray-500 mb-1">Patient</div>
                  <div className="font-semibold text-gray-900">{bookingDetails.fullName}</div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="pt-6 border-t space-y-3">
              <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-cyan-600" />
                <span>{bookingDetails.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-cyan-600" />
                <span>{bookingDetails.phone}</span>
              </div>
            </div>

            {/* Confirmation Message */}
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed">
                <strong>What's next?</strong> A confirmation email has been sent to {bookingDetails.email}. 
                Please arrive 10 minutes early for your appointment. If you need to reschedule or cancel, 
                please contact us at least 24 hours in advance.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to={createPageUrl("MyAppointments")} className="flex-1">
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50"
              >
                <Eye className="w-4 h-4 mr-2" />
                View My Appointments
              </Button>
            </Link>
            <Button
              onClick={onNewBooking}
              className="flex-1 h-12 rounded-xl bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30"
            >
              Book Another Appointment
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}