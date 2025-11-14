import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, MapPin, Star } from "lucide-react";
import { format, addDays } from "date-fns";

export default function TimeSlotPicker({ doctor, onSelectTimeSlot, onBack }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  const handleContinue = () => {
    if (selectedTime) {
      onSelectTimeSlot({
        date: format(selectedDate, "MMMM d, yyyy"),
        time: selectedTime
      });
    }
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
        Back to Doctors
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Doctor Info */}
        <Card className="lg:col-span-1 p-6 border-0 shadow-xl rounded-2xl bg-white h-fit sticky top-6">
          <div className="relative w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">{doctor.name}</h2>
          <p className="text-center text-cyan-600 font-medium mb-4">{doctor.specialty}</p>

          <div className="flex items-center justify-center gap-1 mb-6">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-lg">{doctor.rating}</span>
            <span className="text-gray-500">({doctor.reviews} reviews)</span>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-600" />
              <span>{doctor.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-600" />
              <span>{doctor.experience} experience</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-600">{doctor.about}</p>
          </div>
        </Card>

        {/* Date and Time Selection */}
        <Card className="lg:col-span-2 p-8 border-0 shadow-xl rounded-2xl bg-white">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-cyan-600" />
            Select Date & Time
          </h2>

          {/* Date Selection */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Choose a Date</h3>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
              {dates.map((date) => {
                const isSelected = format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
                return (
                  <motion.button
                    key={date.toISOString()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime(null);
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-cyan-600 bg-linear-to-br from-cyan-50 to-blue-50 shadow-lg"
                        : "border-gray-200 hover:border-cyan-300 hover:bg-cyan-50"
                    }`}
                  >
                    <div className={`text-xs font-medium mb-1 ${isSelected ? "text-cyan-700" : "text-gray-500"}`}>
                      {format(date, "EEE")}
                    </div>
                    <div className={`text-2xl font-bold ${isSelected ? "text-cyan-700" : "text-gray-900"}`}>
                      {format(date, "d")}
                    </div>
                    <div className={`text-xs ${isSelected ? "text-cyan-600" : "text-gray-500"}`}>
                      {format(date, "MMM")}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Available Time Slots</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {doctor.availability.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <motion.button
                    key={time}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTime(time)}
                    className={`p-4 rounded-xl border-2 transition-all font-medium ${
                      isSelected
                        ? "border-cyan-600 bg-linear-to-br from-cyan-600 to-blue-600 text-white shadow-lg"
                        : "border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 text-gray-700"
                    }`}
                  >
                    {time}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <Button
            onClick={handleContinue}
            disabled={!selectedTime}
            className="w-full bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl h-14 text-lg font-semibold shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Booking Details
          </Button>
        </Card>
      </div>
    </motion.div>
  );
}