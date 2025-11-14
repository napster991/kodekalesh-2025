import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Award, Clock } from "lucide-react";

export default function DoctorCard({ doctor, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl">
        <div className="relative h-48 overflow-hidden bg-linear-to-br from-cyan-100 to-blue-100">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-sm">{doctor.rating}</span>
            <span className="text-xs text-gray-500">({doctor.reviews})</span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
          <Badge className="bg-linear-to-r from-cyan-100 to-blue-100 text-cyan-800 border-0 mb-4">
            {doctor.specialty}
          </Badge>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Award className="w-4 h-4 text-cyan-600" />
              <span className="text-sm">{doctor.experience} experience</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-cyan-600" />
              <span className="text-sm">{doctor.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4 text-cyan-600" />
              <span className="text-sm">{doctor.availability.length} slots available</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-6 line-clamp-2">{doctor.about}</p>

          <Button
            onClick={() => onSelect(doctor)}
            className="w-full bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl h-12 text-base font-semibold shadow-lg shadow-cyan-500/30"
          >
            Book Appointment
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}