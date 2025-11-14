import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function CancelDialog({ open, onOpenChange, onConfirm, appointment }) {
  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <DialogTitle className="text-2xl text-center">Cancel Appointment?</DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Are you sure you want to cancel your appointment with{" "}
            <strong>{appointment.doctor.name}</strong> on{" "}
            <strong>{appointment.timeSlot.date}</strong> at{" "}
            <strong>{appointment.timeSlot.time}</strong>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-row gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl h-12 border-2"
          >
            Keep Appointment
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 rounded-xl h-12 bg-red-600 hover:bg-red-700 text-white"
          >
            Yes, Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}