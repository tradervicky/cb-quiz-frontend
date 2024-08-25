
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
import { Plus } from "lucide-react"
const ModalCategory = () => {
  return (
    <Dialog>
    <DialogTrigger asChild className="cursor-pointer">
      <Plus />
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Category</DialogTitle>
        <DialogDescription>
          Question Category, e.g : General Knowledge, Current Affairs
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="flex flex-col  gap-4">
          <Label htmlFor="name" className="text-left ">
            Category
          </Label>
          <Input id="name"  placeholder="Enter category" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default ModalCategory