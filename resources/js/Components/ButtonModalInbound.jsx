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
// import { Input } from "./ui/input"
// import { Label } from "./ui/label"
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import React from 'react';
import { useForm } from 'react-hook-form';


export function ButtonModalInbound() {


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-PurpleFive  hover:bg-primaryPurple'>Create</Button>
      </DialogTrigger>
      <DialogContent className= "max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Create Data</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-5 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" placeholder="Input name" className="col-span-3 border-bs" />
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
        </div> */}
        <form>
            <div className="mt-4">
              <InputLabel                             
                  htmlFor="name"
                  value="Name"
              >
              </InputLabel>
              <TextInput
                  id="name"
                  type="text"
                  name="name"
                  className="mt-1 block w-full"
                  isFocused
                  placeholder="Input your name"
              /> 
            </div>
            <div className="mt-4">
              <InputLabel                             
                  htmlFor="name"
                  value="Name"
              >
              </InputLabel>
              <TextInput
                  id="name"
                  type="text"
                  name="name"
                  className="mt-1 block w-full"
                  placeholder="Input your name"
              /> 
            </div>
            <div className="mt-4">
              <InputLabel                             
                  htmlFor="name"
                  value="Name"
              >
              </InputLabel>
              <TextInput
                  id="name"
                  type="text"
                  name="name"
                  className="mt-1 block w-full"
                  placeholder="Input your name"
              /> 
            </div>
            <div className="mt-4">
              <InputLabel                             
                  htmlFor="name"
                  value="Name"
              >
              </InputLabel>
              <TextInput
                  id="name"
                  type="text"
                  name="name"
                  className="mt-1 block w-full"
                  placeholder="Input your name"
              /> 
            </div>
            <div className="mt-4">
              <InputLabel                             
                  htmlFor="name"
                  value="Name"
              >
              </InputLabel>
              <TextInput
                  id="name"
                  type="text"
                  name="name"
                  className="mt-1 block w-full"
                  placeholder="Input your name"
              /> 
            </div>
            <div className="mt-4">
              <InputLabel                             
                  htmlFor="name"
                  value="Name"
              >
              </InputLabel>
              <TextInput
                  id="name"
                  type="file"
                  accept="image/*"
                  name="name"
                  className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                  
              
              /> 
            </div>



          <DialogFooter>
            <Button 
              type="submit"  
              className='bg-PurpleFive hover:bg-primaryPurple'>
                Save
            </Button>
        </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}
