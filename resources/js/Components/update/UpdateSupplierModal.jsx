import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import InputLabel from "../InputLabel";
import { useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import { router } from "@inertiajs/react"; 

export function UpdateSupplierModal({ userRole, open, onClose, supplier }) {
  const {flash} = usePage().props;
  const { data, setData, errors, setErrors, put, reset } = useForm({
    name: supplier?.name || "",
    contact: supplier?.contact || "",
    address: supplier?.address || "",
    accountNumber: supplier?.account_number ||"",
    accountName: supplier?.account_name || "",
    accountBankName: supplier?.account_bank_name || ""
  });
  // console.log(supplier)

  useEffect(() => {
    if (supplier) {
      setData({
        name: supplier.name,
        contact: supplier.contact,
        address: supplier.address,
        accountNumber: supplier.account_number,
        accountName: supplier.account_name,
        accountBankName: supplier.account_bank_name
      });
    }
  }, [supplier]);

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success, { duration: 5000 });
      onClose(); 
    }
    if (flash?.error) {
      toast.error(flash.error, { duration: 5000 });
    }
  }, [flash]);

  function handleSubmit(e) {
    e.preventDefault();

    const rolePaths = {
      admin: `/admin/supplier/${supplier?.id}`,
      wrhs: `/wrhs/supplier/${supplier?.id}`,
    };

    const userPath = rolePaths[userRole];

    put(userPath, data, {
      forceFormData: true,
      onError: (errors) => {
        setErrors(errors);
        toast.error("Failed to update Data Supplier! ❌");
      },
    });
    
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
        <DialogTitle>Update Supplier Data</DialogTitle>
        <DialogDescription>
          Update the supplier information, then click Save.
        </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Supplier Name" />
            <input
              id="name"
              type="text"
              name="name"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Supplier Name"
              value={data.name || ""}
              onChange={(e) => setData("name", e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="contact" value="Contact" />
            <input
              id="contact"
              type="text"
              name="contact"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Contact Supplier"
              value={data.contact || ""}
              onChange={(e) => setData("contact", e.target.value)}
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="address" value="Address" />
            <input
              id="address"
              type="text"
              name="address"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Address"
              value={data.address || ""}
              onChange={(e) => setData("address", e.target.value)}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="accountNumber" value="Bank Account Number" />
            <input
              id="accountNumber"
              type="number"
              name="accountNumber"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Bank Account Number"
              value={data.accountNumber || ""}
              onChange={(e) => setData("accountNumber", e.target.value)}
            />
            {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="accountName" value="Account Holder Name " />
            <input
              id="accountName"
              type="text"
              name="accountName"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Account Holder Name"
              value={data.accountName || ""}
              onChange={(e) => setData("accountName", e.target.value)}
            />
            {errors.accountName && <p className="text-red-500 text-sm">{errors.accountName}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="accountBankName" value="Account Bank Name" />
            <input
              id="accountBankName"
              type="text"
              name="accountBankName"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Account Bank Name"
              value={data.accountBankName || ""}
              onChange={(e) => setData("accountBankName", e.target.value)}
            />
            {errors.accountBankName && <p className="text-red-500 text-sm">{errors.accountBankName}</p>}
          </div>
          <DialogFooter>
            <Button
              type="button"
              className="bg-gray-200 text-black border border-gray-400 mt-5 hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white mt-5">
              Save
            </Button>

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
