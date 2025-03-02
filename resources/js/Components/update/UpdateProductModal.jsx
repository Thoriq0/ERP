import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import InputLabel from "../InputLabel";
import { useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";

export function UpdateProductModal({ userRole, open, onClose, product, categoryData, supplierData }) {
  const {flash} = usePage().props;
  const { data, setData, put, errors, setErrors, reset } = useForm({
    name: product?.name || "",
    category_id: product?.category_id || "",
    supplier_id: product?.supplier_id || "",
  });
  // console.log(product);
  useEffect(() => {
    if (product) {
      setData({
        name: product.name || "",
        category_id: product.category_id || "",
        supplier_id: product.supplier_id || "",
      });
    }
  }, [product]);

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
    // console.log("Data yang dikirim:", data);
    const rolePaths = {
      admin: `/admin/product/${product?.id}`,
      wrhs: `/wrhs/product/${product?.id}`,
    };

    const userPath = rolePaths[userRole];

    put(userPath, data, {
      forceFormData: true,
      onError: (errors) => {
        setErrors(errors);
        toast.error("Gagal memperbarui Data Supplier! ❌");
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
            <DialogHeader>
                <DialogTitle>Update Produk Masuk</DialogTitle>
                <DialogDescription>
                    Update data produk yang masuk, lalu klik Simpan.
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
                    <InputLabel htmlFor="category_id" value="Kategori" />
                    <select
                        id="category_id"
                        name="category_id"
                        className="mt-1 block w-full border p-2 rounded-md"
                        value={data.category_id}
                        onChange={(e) => setData("category_id", e.target.value)}
                    >
                        {categoryData.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="supplier_id" value="Supplier" />
                    <select
                        id="supplier_id"
                        name="supplier_id"
                        className="mt-1 block w-full border p-2 rounded-md "
                        value={data.supplier_id}
                        onChange={(e) => setData("supplier_id", Number(e.target.value))}
                    >
                        {supplierData.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                    {errors.supplier_id && <p className="text-red-500 text-sm">{errors.supplier_id}</p>}
                </div>
                <DialogFooter>
                    <Button type="button" className="bg-white text-black border border-gray-400 mt-5 hover:bg-white" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-PurpleFive hover:bg-primaryPurple mt-5">
                        Simpan
                    </Button>


                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  );
}