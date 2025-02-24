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
import { useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import { router } from "@inertiajs/react"; 

export function UpdateSupplierModal({ userRole, open, onClose, supplier }) {
  const { data, setData, errors, setErrors, post, reset } = useForm({
    name: supplier?.name || "",
    contact: supplier?.contact || "",
    address: supplier?.address || "",
  });

  useEffect(() => {
    if (supplier) {
      setData({
        name: supplier.name,
        contact: supplier.contact,
        address: supplier.address,
      });
    }
  }, [supplier]);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    const rolePaths = {
      admin: "/admin/supplier",
      wrhs: "/wrhs/supplier",
    };

    const userPath = rolePaths[userRole];

    post(
      userPath,
      {
        ...data,
      },
      {
        forceFormData: true,
        onSuccess: () => {
          toast.success("Data Supplier berhasil diperbarui! 🎉");
          reset();
          onClose(); // Tutup modal setelah sukses
        },
        onError: (err) => {
          setErrors(err);
          toast.error("Gagal memperbarui Data Supplier! ❌");
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Update Supplier Masuk</DialogTitle>
          <DialogDescription>
            Update data supplier yang masuk, lalu klik Simpan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Nama Produk" />
            <input
              id="name"
              type="text"
              name="name"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Nama Produk"
              value={data.name}
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
              value={data.contact}
              onChange={(e) => setData("contact", e.target.value)}
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="address" value="Alamat Supplier" />
            <input
              id="address"
              type="text"
              name="address"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Alamat Supplier"
              value={data.address}
              onChange={(e) => setData("address", e.target.value)}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
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
