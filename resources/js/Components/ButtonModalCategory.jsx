import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import React, { useState } from "react";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast"; 

export function ButtonModalCategory({userRole}) {
  // State untuk form
  const [values, setValues] = useState({
    name: "",
  });

  // State untuk error
  const [errors, setErrors] = useState({});

  // Handle perubahan input
  function handleChange(e) {
    const { name, value, type, files } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  // Handle submit
  function handleSubmit(e) {
    e.preventDefault();
    setErrors({}); // Reset error sebelum submit

    // Mapping role endpoint
    const rolePaths = {
      admin: "/admin/category",
      wrhs: "/wrhs/category",
    };
  
    const userPath = rolePaths[userRole];


    // Kirim data ke backend
    router.post(
      userPath,
      values,
      {
        forceFormData: true,
        onSuccess: () => {
          toast.success("Category saved successfully! 🎉", {
            duration: 5000,
          });
          setValues({
            name: "",
          });
        },
        onError: (err) => {
          setErrors(err); // Simpan error ke state
          toast.error("Failed to save Category! ❌", {
              duration: 5000,
          });
        },
      }
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-PurpleFive hover:bg-primaryPurple">Create</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Category Data</DialogTitle>
          <DialogDescription>
            Please fill out the form below with the category information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Category Name" />
            <TextInput
              id="name"
              type="text"
              name="name"
              className="mt-1 block w-full"
              placeholder="Category Name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-PurpleFive hover:bg-primaryPurple mt-5">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
