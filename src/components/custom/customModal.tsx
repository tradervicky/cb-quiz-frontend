import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

interface CustomModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleOpen: (open: boolean) => void;
  dialogTitle: string;
  dialogDescription: string;
  placeholder: string;
  label: string;
  onClick: () => void;
  categoryTitle: string;
  setCategoryTitle: (value: string) => void;
}

const CustomModal = ({
  children,
  isOpen,
  handleOpen,
  dialogTitle,
  dialogDescription,
  placeholder,
  label,
  onClick,
  categoryTitle,
  setCategoryTitle,
}: CustomModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      {children}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="category-input" className="text-left">
              {label}
            </Label>
            <Input
              id="category-input"
              placeholder={placeholder}
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClick}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
