import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { toast } from "./ui/sonner"

export function ButtonModalInbound() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-PurpleFive  hover:bg-primaryPurple'>Create</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create Data</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder="Input name" className="col-span-3 border-bs" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Date In
            </Label>
            <Input id="username" type="date" placeholder="" className="col-span-1 border-bs" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Qty
            </Label>
            <Input id="username" type="text" placeholder="Input Quantity" className="col-span-3 border-bs" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Supplier
            </Label>
            <Input id="username" type="text" placeholder="Input Supplier" className="col-span-3 border-bs" />
          </div>
        </div>
        <DialogFooter>
            <Button 
              type="submit"
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                  },
                })
              } 
              className='bg-PurpleFive hover:bg-primaryPurple'>
                Save
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
