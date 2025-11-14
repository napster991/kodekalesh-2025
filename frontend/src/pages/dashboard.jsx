import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, TrendingUp, Users, Plus, ArrowRight } from "lucide-react";
import StatsCard from "../components/dashboard/StatsCard";
import AppointmentChart from "../components/dashboard/AppointmentChart";
import UpcomingAppointments from "../components/dashboard/UpcomingAppointments";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

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

  const getStats = () => {
    const now = new Date();
    const total = appointments.length;
    const upcoming = appointments.filter(apt => 
      apt.status !== "cancelled" && new Date(apt.dateTime) >= now
    ).length;
    const completed = appointments.filter(apt => 
      apt.status !== "cancelled" && new Date(apt.dateTime) < now
    ).length;
    const cancelled = appointments.filter(apt => apt.status === "cancelled").length;

    // Get unique doctors
    const uniqueDoctors = new Set(appointments.map(apt => apt.doctor.id)).size;

    return { total, upcoming, completed, cancelled, uniqueDoctors };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-cyan-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-cyan-600 to-blue-600 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
                Welcome Back!
              </h1>
              <p className="text-lg text-cyan-50">
                Here's your healthcare overview
              </p>
            </div>
            <Link to={createPageUrl("DoctorBooking")}>
              <Button className="bg-white text-cyan-700 hover:bg-cyan-50 h-12 px-6 rounded-xl text-base font-semibold shadow-xl">
                <Plus className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatsCard
            title="Total Appointments"
            value={stats.total}
            icon={Calendar}
            color="cyan"
            trend={stats.total > 0 ? `${stats.upcoming} upcoming` : null}
          />
          <StatsCard
            title="Upcoming"
            value={stats.upcoming}
            icon={Clock}
            color="blue"
            trend={stats.upcoming > 0 ? "Next 30 days" : null}
          />
          <StatsCard
            title="Completed"
            value={stats.completed}
            icon={TrendingUp}
            color="green"
            trend={stats.completed > 0 ? "All time" : null}
          />
          <StatsCard
            title="Doctors Visited"
            value={stats.uniqueDoctors}
            icon={Users}
            color="purple"
            trend={stats.uniqueDoctors > 0 ? "Healthcare providers" : null}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {/* Chart */}
          <div className="lg:col-span-2">
            <AppointmentChart appointments={appointments} />
          </div>

          {/* Quick Actions */}
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Appointments Overview */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <UpcomingAppointments appointments={appointments} />
          </div>

          {/* Recent Activity */}
          <div>
            <RecentActivity appointments={appointments} />
          </div>
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-3xl shadow-lg mt-10"
          >
            <div className="w-32 h-32 bg-linear-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-16 h-16 text-cyan-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Start Your Healthcare Journey
            </h3>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
              Book your first appointment with our world-class doctors and take control of your health.
            </p>
            <Link to={createPageUrl("DoctorBooking")}>
              <Button className="bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 h-14 px-10 rounded-xl text-lg font-semibold shadow-lg shadow-cyan-500/30">
                <Plus className="w-5 h-5 mr-2" />
                Book Your First Appointment
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}