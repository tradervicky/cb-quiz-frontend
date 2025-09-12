import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import Loader from "./Loader";
interface CustomAlertProps {
  children: React.ReactNode;
  title: string;
  description: string;
  onContinue?: () => Promise<void> | void;
}

const CustomAlert = ({
  children,
  title,
  description,
  onContinue,
}: CustomAlertProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleContinue = async () => {
    if (!onContinue) return;
    setLoading(true);
    try {
      await onContinue();
      setOpen(false);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            {loading ? (
              <Loader size="h-4 w-4" color="text-white" />
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlert;
