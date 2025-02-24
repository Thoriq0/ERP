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

export function UpdateCategoryModal({ userRole, open, onClose, category }) {
  const { data, setData, errors, setErrors, post, reset } = useForm({
    name: category?.name || "",
  });

  useEffect(() => {
    if (category) {
      setData({
        name: category.name,
      });
    }
  }, [category]);

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
          <DialogTitle>Update Category Masuk</DialogTitle>
          <DialogDescription>
            Update data category yang masuk, lalu klik Simpan.
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
