import { User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Topbar = () => {
  return (
    <div className="border-b-[3px] border-black">
      <div className="flex justify-between items-center mx-6 h-20">
        <div>
          <p className="text-2xl font-semibold">Admin Panel</p>
        </div>
        <div className="p-2 ">
          <Popover>
            <PopoverTrigger className="p-2 hover:bg-gray-300  transition cursor-pointer duration-300 ease-in-out rounded-full">
              <User />
            </PopoverTrigger>
            <PopoverContent className="mr-2 w-36">
              <p className="hover:bg-slate-300 px-2 py-2 rounded-xl hover:text-highlight">
                Profile
              </p>
              <p className="hover:bg-slate-300 px-2 py-2 rounded-xl hover:text-highlight">
                Log out
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
