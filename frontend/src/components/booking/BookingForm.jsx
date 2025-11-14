import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Phone, MessageSquare, Calendar, Clock } from "lucide-react";

export default function BookingForm({ doctor, timeSlot, onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    reason: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate booking ID
    const bookingId = Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Create appointment object
    const appointment = {
      id: Date.now(),
      bookingId,
      ...formData,
      doctor,
      timeSlot,
      dateTime: new Date(`${timeSlot.date} ${timeSlot.time}`).toISOString(),
      status: "confirmed",
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const existingAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    existingAppointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(existingAppointments));
    
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 hover:bg-cyan-50 text-cyan-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Time Selection
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Booking Summary */}
        <Card className="lg:col-span-1 p-6 border-0 shadow-xl rounded-2xl bg-linear-to-br from-cyan-600 to-blue-600 text-white h-fit sticky top-6">
          <h3 className="text-xl font-bold mb-6">Booking Summary</h3>

          <div className="relative w-24 h-24 mx-auto mb-4 rounded-xl overflow-hidden border-4 border-white/30">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h4 className="text-lg font-bold text-center mb-1">{doctor.name}</h4>
          <p className="text-center text-cyan-100 mb-6">{doctor.specialty}</p>

          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Calendar className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-cyan-100 mb-1">Date</div>
                <div className="font-semibold">{timeSlot.date}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Clock className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs text-cyan-100 mb-1">Time</div>
                <div className="font-semibold">{timeSlot.time}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Patient Information Form */}
        <Card className="lg:col-span-2 p-8 border-0 shadow-xl rounded-2xl bg-white">
          <h2 className="text-3xl font-bold mb-8">Patient Information</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-base font-semibold text-gray-700">
                Full Name *
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="John Doe"
                  required
                  className="pl-12 h-14 text-base border-gray-200 focus:border-cyan-500 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold text-gray-700">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="pl-12 h-14 text-base border-gray-200 focus:border-cyan-500 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-semibold text-gray-700">
                Phone Number *
              </Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="pl-12 h-14 text-base border-gray-200 focus:border-cyan-500 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason" className="text-base font-semibold text-gray-700">
                Reason for Visit
              </Label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => handleChange("reason", e.target.value)}
                  placeholder="Please describe your symptoms or reason for consultation..."
                  rows={5}
                  className="pl-12 pt-4 text-base border-gray-200 focus:border-cyan-500 rounded-xl resize-none"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl h-14 text-lg font-semibold shadow-lg shadow-cyan-500/30"
              >
                Confirm Booking
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </motion.div>
  );
}