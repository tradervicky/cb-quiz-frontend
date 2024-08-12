import { Button } from "@/components/ui/button";
import {  Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, } from "@/components/ui/dialog";
import { User } from "lucide-react";

const Topbar = () => {
  return (
    <div className="border-b-[3px] border-black">
      <div className="flex justify-between items-center mx-6 h-20">
        <div>
          <p className="text-2xl font-semibold">Admin Panel</p>
        </div>
        <div className="p-2 hover:bg-gray-300  transition cursor-pointer duration-300 ease-in-out rounded-full" >
         
                <User className="h-6 w-6" />
           
        </div>
      </div>
    </div>
  );
};

export default Topbar;
