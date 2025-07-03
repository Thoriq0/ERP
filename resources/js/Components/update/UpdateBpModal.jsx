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

export function UpdateBpModal({ userRole, open, onClose, bp }) {
  const {flash} = usePage().props;
  const { data, setData, errors, setErrors, put, reset } = useForm({
    bill_to: bp?.bill_to || "",
    contact_bill: bp?.contact_bill || "",
    address_bill: bp?.address_bill || "",
    email_bill: bp?.email_bill || "",
    account_bill: bp?.account_bill || "",
    account_bill_name: bp?.account_bill_name || "",
    account_bank_name: bp?.account_bank_name || "",
  });

  useEffect(() => {
    if (bp) {
      setData({
        bill_to: bp.bill_to,
        contact_bill: bp.contact_bill,
        address_bill: bp.address_bill,
        email_bill: bp.email_bill,
        account_bill: bp.account_bill,
        account_bill_name: bp.account_bill_name,
        account_bank_name: bp.account_bank_name,
      });
    }
  }, [bp]);

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
      admin: `/admin/bp/${bp?.id}`,
      fnc: `/finance/bp/${bp?.id}`,
    };

    const userPath = rolePaths[userRole];

    put(userPath, data, {
      forceFormData: true,
      onError: (errors) => {
        setErrors(errors);
        toast.error("Failed to update Data Billed Party! ❌");
      },
    });
    
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Update Billed Party</DialogTitle>
          <DialogDescription>
            Update the billed party information, then click Save.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
        <div className="mt-4">
            <InputLabel htmlFor="bill_to" value="Company Name" />
            <input
              id="bill_to"
              type="text"
              name="bill_to"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Company Name"
              value={data.bill_to || ""}
              onChange={(e) => setData("bill_to", e.target.value)}
            />
            {errors.bill_to && <p className="text-red-500 text-sm">{errors.bill_to}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="contact_bill" value="Contact" />
            <input
              id="contact_bill"
              type="text"
              name="contact_bill"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Contact Bill"
              value={data.contact_bill || ""}
              onChange={(e) => setData("contact_bill", e.target.value)}
            />
            {errors.contact_bill && <p className="text-red-500 text-sm">{errors.contact_bill}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="address_bill" value="Address" />
            <input
              id="address_bill"
              type="text"
              name="address_bill"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Address Bill"
              value={data.address_bill || ""}
              onChange={(e) => setData("address_bill", e.target.value)}
            />
            {errors.address_bill && <p className="text-red-500 text-sm">{errors.address_bill}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="email_bill" value="Email" />
            <input
              id="email_bill"
              type="email"
              name="email_bill"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Email Bill"
              value={data.email_bill || ""}
              onChange={(e) => setData("email_bill", e.target.value)}
            />
            {errors.email_bill && <p className="text-red-500 text-sm">{errors.email_bill}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="account_bill" value="Bank Account Number" />
            <input
              id="account_bill"
              type="number"
              name="account_bill"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Bank Account Number"
              value={data.account_bill || ""}
              onChange={(e) => setData("account_bill", e.target.value)}
            />
            {errors.account_bill && <p className="text-red-500 text-sm">{errors.account_bill}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="account_bill_name" value="Account Holder Name" />
            <input
              id="account_bill_name"
              type="text"
              name="account_bill_name"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Account Holder Name"
              value={data.account_bill_name || ""}
              onChange={(e) => setData("account_bill_name", e.target.value)}
            />
            {errors.account_bill_name && <p className="text-red-500 text-sm">{errors.account_bill_name}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="account_bank_name" value="Account Bank Name" />
            <input
              id="account_bank_name"
              type="text"
              name="account_bank_name"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Account Bank Name"
              value={data.account_bank_name || ""}
              onChange={(e) => setData("account_bank_name", e.target.value)}
            />
            {errors.account_bank_name && <p className="text-red-500 text-sm">{errors.account_bank_name}</p>}
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
