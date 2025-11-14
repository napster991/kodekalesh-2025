import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AppointmentCard from "../components/appointments/AppointmentCard";
import CancelDialog from "../components/appointments/CancelDialog";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      const parsed = JSON.parse(stored);
      setAppointments(parsed);
    }
  };

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (selectedAppointment) {
      const updated = appointments.map(apt => 
        apt.id === selectedAppointment.id 
          ? { ...apt, status: "cancelled" }
          : apt
      );
      setAppointments(updated);
      localStorage.setItem("appointments", JSON.stringify(updated));
      setCancelDialogOpen(false);
      setSelectedAppointment(null);
    }
  };

  const getFilteredAppointments = () => {
    const now = new Date();
    
    return appointments.filter(apt => {
      const aptDate = new Date(apt.dateTime);
      
      if (activeTab === "upcoming") {
        return apt.status !== "cancelled" && aptDate >= now;
      } else if (activeTab === "past") {
        return apt.status !== "cancelled" && aptDate < now;
      } else if (activeTab === "cancelled") {
        return apt.status === "cancelled";
      }
      return true;
    }).sort((a, b) => {
      const dateA = new Date(a.dateTime);
      const dateB = new Date(b.dateTime);
      return activeTab === "past" ? dateB - dateA : dateA - dateB;
    });
  };

  const filteredAppointments = getFilteredAppointments();

  const getStats = () => {
    const now = new Date();
    const upcoming = appointments.filter(apt => 
      apt.status !== "cancelled" && new Date(apt.dateTime) >= now
    ).length;
    const past = appointments.filter(apt => 
      apt.status !== "cancelled" && new Date(apt.dateTime) < now
    ).length;
    const cancelled = appointments.filter(apt => apt.status === "cancelled").length;
    
    return { upcoming, past, cancelled };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-cyan-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-cyan-600 to-blue-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                My Appointments
              </h1>
              <p className="text-xl text-cyan-50">
                Manage your healthcare schedule
              </p>
            </div>
            <Link to={createPageUrl("DoctorBooking")}>
              <Button className="bg-white text-cyan-700 hover:bg-cyan-50 h-14 px-8 rounded-xl text-base font-semibold shadow-xl">
                <Plus className="w-5 h-5 mr-2" />
                Book New Appointment
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Upcoming</p>
                <p className="text-4xl font-bold text-gray-900">{stats.upcoming}</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Completed</p>
                <p className="text-4xl font-bold text-gray-900">{stats.past}</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Cancelled</p>
                <p className="text-4xl font-bold text-gray-900">{stats.cancelled}</p>
              </div>
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-7 h-7 text-red-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-white shadow-md rounded-xl p-2 h-auto border border-gray-100">
            <TabsTrigger 
              value="upcoming" 
              className="rounded-lg px-6 py-3 text-base data-[state=active]:bg-linear-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              Upcoming ({stats.upcoming})
            </TabsTrigger>
            <TabsTrigger 
              value="past" 
              className="rounded-lg px-6 py-3 text-base data-[state=active]:bg-linear-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              Past ({stats.past})
            </TabsTrigger>
            <TabsTrigger 
              value="cancelled" 
              className="rounded-lg px-6 py-3 text-base data-[state=active]:bg-linear-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              Cancelled ({stats.cancelled})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Appointments List */}
        <AnimatePresence mode="wait">
          {filteredAppointments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {activeTab === "upcoming" && "No Upcoming Appointments"}
                {activeTab === "past" && "No Past Appointments"}
                {activeTab === "cancelled" && "No Cancelled Appointments"}
              </h3>
              <p className="text-gray-500 mb-8">
                {activeTab === "upcoming" && "You don't have any scheduled appointments yet."}
                {activeTab === "past" && "You haven't completed any appointments yet."}
                {activeTab === "cancelled" && "You haven't cancelled any appointments."}
              </p>
              {activeTab === "upcoming" && (
                <Link to={createPageUrl("DoctorBooking")}>
                  <Button className="bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 h-12 px-8 rounded-xl text-base font-semibold shadow-lg">
                    <Plus className="w-5 h-5 mr-2" />
                    Book Your First Appointment
                  </Button>
                </Link>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onCancel={handleCancelClick}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CancelDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        onConfirm={handleConfirmCancel}
        appointment={selectedAppointment}
      />
    </div>
  );
}