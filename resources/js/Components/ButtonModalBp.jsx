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

export function ButtonModalBp({userRole}) {
  // State untuk form
  const [values, setValues] = useState({
    bill_to: "",
    contact_bill: "",
    address_bill: "",
    email_bill: "",
    account_bill: "",
    account_bill_name: "",
    account_bank_name: "",
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
      admin: "/admin/bp",
      wrhs: "/finance/bp",
    };
  
    const userPath = rolePaths[userRole];


    // Kirim data ke backend
    router.post(
      userPath,
      values,
      {
        forceFormData: true,
        onSuccess: () => {
          toast.success("Produk berhasil disimpan! 🎉", {
            duration: 5000,
          });
          setValues({
            bill_to: "",
            contact_bill: "",
            address_bill: "",
            email_bill: "",
            account_bill: "",
            account_bill_name: "",
            account_bank_name: "",
          });
        },
        onError: (err) => {
          setErrors(err); // Simpan error ke state
          toast.error("Gagal menyimpan produk! ❌", {
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
          <DialogTitle>Data Billed Party</DialogTitle>
          <DialogDescription>
            Masukkan data billed party, lalu klik Simpan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
        <div className="mt-4">
            <InputLabel htmlFor="bill_to" value="Bill To" />
            <TextInput
              id="bill_to"
              type="text"
              name="bill_to"
              className="mt-1 block w-full"
              placeholder="Bill To"
              value={values.bill_to}
              onChange={handleChange}
            />
            {errors.bill_to && <p className="text-red-500 text-sm">{errors.bill_to}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="contact_bill" value="Contact Bill" />
            <TextInput
              id="contact_bill"
              type="number"
              name="contact_bill"
              className="mt-1 block w-full"
              placeholder="Contact Bill"
              value={values.contact_bill}
              onChange={handleChange}
            />
            {errors.contact_bill && <p className="text-red-500 text-sm">{errors.contact_bill}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="address_bill" value="Address Bill" />
            <TextInput
              id="address_bill"
              type="text"
              name="address_bill"
              className="mt-1 block w-full"
              placeholder="Address Bill"
              value={values.address_bill}
              onChange={handleChange}
            />
            {errors.address_bill && <p className="text-red-500 text-sm">{errors.address_bill}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="email_bill" value="Email Bill" />
            <TextInput
              id="email_bill"
              type="email"
              name="email_bill"
              className="mt-1 block w-full"
              placeholder="Email Bill"
              value={values.email_bill}
              onChange={handleChange}
            />
            {errors.email_bill && <p className="text-red-500 text-sm">{errors.email_bill}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="account_bill" value="Account Bill" />
            <TextInput
              id="account_bill"
              type="number"
              name="account_bill"
              className="mt-1 block w-full"
              placeholder="Account Bill"
              value={values.account_bill}
              onChange={handleChange}
            />
            {errors.account_bill && <p className="text-red-500 text-sm">{errors.account_bill}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="account_bill_name" value="Account Bill Name" />
            <TextInput
              id="account_bill_name"
              type="text"
              name="account_bill_name"
              className="mt-1 block w-full"
              placeholder="Account Bill Name"
              value={values.account_bill_name}
              onChange={handleChange}
            />
            {errors.account_bill_name && <p className="text-red-500 text-sm">{errors.account_bill_name}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="account_bank_name" value="Account Bank Name" />
            <TextInput
              id="account_bank_name"
              type="text"
              name="account_bank_name"
              className="mt-1 block w-full"
              placeholder="Account Bank Name"
              value={values.account_bank_name}
              onChange={handleChange}
            />
            {errors.account_bank_name && <p className="text-red-500 text-sm">{errors.account_bank_name}</p>}
          </div>


          <DialogFooter>
            <Button type="submit" className="bg-PurpleFive hover:bg-primaryPurple mt-5">
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
