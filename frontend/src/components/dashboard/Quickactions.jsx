import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, MessageCircle } from "lucide-react";

const actions = [
  {
    title: "Book Appointment",
    description: "Schedule with a doctor",
    icon: Calendar,
    color: "cyan",
    link: "DoctorBooking"
  },
  {
    title: "My Appointments",
    description: "View your schedule",
    icon: Clock,
    color: "blue",
    link: "MyAppointments"
  },
  {
    title: "Medical Records",
    description: "Access your history",
    icon: FileText,
    color: "purple",
    link: null
  },
  {
    title: "Message Doctor",
    description: "Get quick answers",
    icon: MessageCircle,
    color: "green",
    link: null
  }
];

const colorClasses = {
  cyan: "bg-cyan-100 text-cyan-600",
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  green: "bg-green-100 text-green-600"
};

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-8 border-0 shadow-lg rounded-2xl bg-white">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>

        <div className="space-y-3">
          {actions.map((action, index) => {
            const ActionButton = (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                  action.link 
                    ? "hover:shadow-md bg-linear-to-r from-gray-50 to-white border border-gray-100 hover:border-cyan-200" 
                    : "bg-gray-50 border border-gray-100 opacity-60 cursor-not-allowed"
                }`}
                disabled={!action.link}
              >
                <div className={`w-12 h-12 ${colorClasses[action.color]} rounded-xl flex items-center justify-center shrink-0`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </motion.button>
            );

            return action.link ? (
              <Link key={index} to={createPageUrl(action.link)}>
                {ActionButton}
              </Link>
            ) : (
              <div key={index}>
                {ActionButton}
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl">
          <p className="text-sm text-gray-600">
            <strong>Need help?</strong> Contact our support team 24/7 at{" "}
            <a href="tel:+1234567890" className="text-cyan-600 font-semibold">
              +1 (234) 567-890
            </a>
          </p>
        </div>
      </Card>
    </motion.div>
  );
}