
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
const CustomModal = ({children,  dialogTitle, dialogDescription,placeholder, label,onClick, setCategoryTitle}:any) => {
  return (
    <Dialog>
    <DialogTrigger asChild className="cursor-pointer">
      {children}
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogDescription>
            {dialogDescription}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <form  className="flex flex-col  gap-4">
          <Label htmlFor="name" className="text-left ">
            {label}
          </Label>
          <Input id="name"  placeholder={placeholder} className="col-span-3" onChange={(e)=>setCategoryTitle(e.target.value)} />
        </form>
      </div>
      <DialogFooter>
        <Button onClick={onClick}>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default CustomModal