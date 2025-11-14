import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Star, CheckCircle2, Clock, MapPin, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DoctorCard from "../components/booking/DoctorCard";
import TimeSlotPicker from "../components/booking/TimeSlotPicker";
import BookingForm from "../components/booking/BookingForm";
import BookingConfirmation from "../components/booking/BookingConfirmation";

// Mock data
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    experience: "15 years",
    rating: 4.9,
    reviews: 247,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    location: "Manhattan Medical Center",
    availability: ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM", "4:30 PM"],
    about: "Specialized in preventive cardiology and heart disease management.",
    languages: ["English", "Mandarin"]
  },
  {
    id: 2,
    name: "Dr. Michael Roberts",
    experience: "12 years",
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    location: "Skin Care Clinic",
    availability: ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM"],
    about: "Expert in cosmetic and medical dermatology procedures.",
    languages: ["English", "Spanish"]
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    experience: "10 years",
    rating: 5.0,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    location: "Children's Health Center",
    availability: ["9:30 AM", "11:00 AM", "2:30 PM", "4:00 PM", "5:00 PM"],
    about: "Passionate about child healthcare and developmental pediatrics.",
    languages: ["English", "Hindi"]
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    experience: "18 years",
    rating: 4.9,
    reviews: 278,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    location: "Sports Medicine Institute",
    availability: ["8:30 AM", "10:00 AM", "1:30 PM", "3:00 PM"],
    about: "Specializing in sports injuries and joint replacement surgery.",
    languages: ["English", "French"]
  },
  {
    id: 5,
    name: "Dr. Emily Park",
    experience: "14 years",
    rating: 4.8,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&h=400&fit=crop",
    location: "Brain & Spine Center",
    availability: ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"],
    about: "Expert in neurological disorders and headache management.",
    languages: ["English", "Korean"]
  },
  {
    id: 6,
    name: "Dr. Ahmed Hassan",
    experience: "20 years",
    rating: 4.9,
    reviews: 421,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
    location: "Family Health Clinic",
    availability: ["8:00 AM", "10:30 AM", "1:00 PM", "3:30 PM", "5:00 PM"],
    about: "Comprehensive primary care for patients of all ages.",
    languages: ["English", "Arabic"]
  }
];

const specialties = ["Doctors"];

export default function DoctorBooking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookingSubmit = (patientData) => {
    setBookingDetails({
      ...patientData,
      doctor: selectedDoctor,
      timeSlot: selectedTimeSlot
    });
    setBookingComplete(true);
  };

  const resetBooking = () => {
    setSelectedDoctor(null);
    setSelectedTimeSlot(null);
    setBookingComplete(false);
    setBookingDetails(null);
  };

  if (bookingComplete) {
    return <BookingConfirmation bookingDetails={bookingDetails} onNewBooking={resetBooking} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-cyan-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-cyan-600 to-blue-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              Book Your Appointment
            </h1>
            <p className="text-xl text-cyan-50 max-w-2xl mx-auto">
              Connect with world-class healthcare professionals
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!selectedDoctor ? (
            <motion.div
              key="doctor-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Search and Filter */}
              <div className="mb-12">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search doctors by name or specialty..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-14 text-lg border-gray-200 focus:border-cyan-500 rounded-xl shadow-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {specialties.map((specialty) => (
                    <Button
                      key={specialty}
                      variant={selectedSpecialty === specialty ? "default" : "outline"}
                      onClick={() => setSelectedSpecialty(specialty)}
                      className={`rounded-full px-6 ${
                        selectedSpecialty === specialty
                          ? "bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                          : "hover:bg-cyan-50 hover:text-cyan-700 border-gray-200"
                      }`}
                    >
                      {specialty}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Doctor Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onSelect={setSelectedDoctor}
                  />
                ))}
              </div>

              {filteredDoctors.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No doctors found matching your criteria</p>
                </div>
              )}
            </motion.div>
          ) : !selectedTimeSlot ? (
            <TimeSlotPicker
              doctor={selectedDoctor}
              onSelectTimeSlot={setSelectedTimeSlot}
              onBack={() => setSelectedDoctor(null)}
            />
          ) : (
            <BookingForm
              doctor={selectedDoctor}
              timeSlot={selectedTimeSlot}
              onSubmit={handleBookingSubmit}
              onBack={() => setSelectedTimeSlot(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
