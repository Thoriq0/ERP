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

export function ButtonModalSupplier({userRole}) {
  // State untuk form
  const [values, setValues] = useState({
    name: "",
    contact: "",
    address: "",
    accountNumber: "",
    accountName: "",
    accountBankName: ""
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
      admin: "/admin/supplier",
      wrhs: "/wrhs/supplier",
    };
  
    const userPath = rolePaths[userRole];


    // Kirim data ke backend
    router.post(
      userPath,
      values,
      {
        forceFormData: true,
        onSuccess: () => {
          toast.success("Supplier data saved successfully! 🎉", {
            duration: 5000,
          });
          setValues({
            name: "",
            contact: "",
            address: "",
            accountNumber: "",
            accountName: "",
            accountBankName: ""
          });
        },
        onError: (err) => {
          setErrors(err); // Simpan error ke state
          toast.error("Failed to save supplier data! ❌", {
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
          <DialogTitle>Supplier Information</DialogTitle>
          <DialogDescription>
            Please fill in the supplier details and click Save.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Supplier Name" />
            <TextInput
              id="name"
              type="text"
              name="name"
              className="mt-1 block w-full"
              placeholder="Nama Supplier"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="contact" value="Contact" />
            <TextInput
              id="contact"
              type="number"
              name="contact"
              className="mt-1 block w-full"
              placeholder="Contact"
              value={values.contact}
              onChange={handleChange}
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="address" value="Address" />
            <TextInput
              id="address"
              type="text"
              name="address"
              className="mt-1 block w-full"
              placeholder="Address"
              value={values.address}
              onChange={handleChange}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="accountNumber" value="Bank Account Number" />
            <TextInput
              id="accountNumber"
              type="number"
              name="accountNumber"
              className="mt-1 block w-full"
              placeholder="Bank account number supplier"
              value={values.accountNumber}
              onChange={handleChange}
            />
            {errors.accountN && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="accountName" value="Account Holder Name" />
            <TextInput
              id="accountName"
              type="text"
              name="accountName"
              className="mt-1 block w-full"
              placeholder="Account Holder Name"
              value={values.accountName}
              onChange={handleChange}
            />
            {errors.accountN && <p className="text-red-500 text-sm">{errors.accountName}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="accountBankName" value="Account Bank Name" />
            <TextInput
              id="accountBankName"
              type="text"
              name="accountBankName"
              className="mt-1 block w-full"
              placeholder="Account Bank Name"
              value={values.accountBankName}
              onChange={handleChange}
            />
            {errors.accountN && <p className="text-red-500 text-sm">{errors.accountBankName}</p>}
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
