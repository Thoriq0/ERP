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

export function UpdateWarehouseModal({ userRole, open, onClose, warehouse }) {
  const {flash} = usePage().props;
  const { data, setData, errors, setErrors, put, reset } = useForm({
    name: warehouse?.name || "",
    location: warehouse?.location || "",
    address: warehouse?.address || "",
    operator: warehouse?.operator || "",
    contact: warehouse?.contact || "",
  });

  useEffect(() => {
    if (warehouse) {
      setData({
        name: warehouse.name,
        location: warehouse.location,
        address: warehouse.address,
        operator: warehouse.operator,
        contact: warehouse.contact
      });
    }
  }, [warehouse]);
  
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
      admin: `/admin/warehouse/${warehouse?.id}`,
    };

    const userPath = rolePaths[userRole];
    
    put(userPath, data, {
      forceFormData: true,
      onError: (err) => {
        setErrors(err);
        toast.error("Gagal memperbarui Data Kategori! ❌", { duration: 5000 });
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Update Warehouse Masuk</DialogTitle>
          <DialogDescription>
            Update data Warehouse, lalu klik Simpan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Nama Category" />
            <input
              id="name"
              type="text"
              name="name"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Nama Category"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="location" value="Nama Lokasi" />
            <input
              id="location"
              type="text"
              name="location"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Nama Lokasi"
              value={data.location}
              onChange={(e) => setData("location", e.target.value)}
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="address" value="Alamat" />
            <input
              id="address"
              type="text"
              name="address"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Alamat"
              value={data.address}
              onChange={(e) => setData("address", e.target.value)}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="operator" value="Nama Operator" />
            <input
              id="operator"
              type="text"
              name="operator"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Nama Operator"
              value={data.operator}
              onChange={(e) => setData("operator", e.target.value)}
            />
            {errors.operator && <p className="text-red-500 text-sm">{errors.operator}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="contact" value="Contact" />
            <input
              id="contact"
              type="number"
              name="contact"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Contact"
              value={data.contact}
              onChange={(e) => setData("contact", e.target.value)}
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
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
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
