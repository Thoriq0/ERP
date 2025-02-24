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

export function UpdateOutboundModal({ userRole, open, onClose, outbound, productData }) {
  // debug
  // console.log("Outbound data:", outbound);
  // console.log("Product data:", productData);

  const { data, setData, errors, setErrors, put, reset } = useForm({
    product_id: outbound?.product_id || "",
    supplier_name: "",
    qty: outbound?.qty || "",
    pic: outbound?.pic || "",
    receiver: outbound?.receiver || "",
  });

  useEffect(() => {
    if (outbound) {
      const selectedProduct = productData.find(prod => prod.id === outbound.product_id);
      setData({
        product_id: outbound.product_id,
        supplier_name: selectedProduct?.supplier?.name || "Tidak Diketahui",
        qty: outbound.qty,
        receiver: outbound.receiver,
        pic: outbound.pic,
      });
    }
  }, [outbound, productData]);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    const rolePaths = {
      admin: "/admin/outbound",
      wrhs: "/wrhs/outbound",
    };

    const userPath = rolePaths[userRole];

    put(
      `${userPath}/${outbound.id}`,
      {
        ...data,
      },
      {
        forceFormData: true,
        onSuccess: () => {
          toast.success("Data Outbound berhasil diperbarui! 🎉");
          reset();
          onClose(); // Tutup modal setelah sukses
        },
        onError: (err) => {
          setErrors(err);
          toast.error("Gagal memperbarui Data Outbound! ❌");
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Update Data Outbound</DialogTitle>
          <DialogDescription>
            Update data outbound yang masuk, lalu klik Simpan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="mt-4">
                <InputLabel htmlFor="product_id" value="Product" />
                <select
                    id="product_id"
                    name="product_id"
                    className="mt-1 block w-full border p-2 rounded-md"
                    value={data.product_id}
                    onChange={(e) => {
                      const selectedProduct = productData.find(prod => prod.id === e.target.value);
                      setData("product_id", e.target.value);
                      setData("supplier_name", selectedProduct?.supplier?.name || "Tidak Diketahui");
                    }}
                    >
                    {productData.map((product) => (
                        <option key={product.id} value={product.id}>
                                {product.name}
                        </option>
                    ))}
                </select>
                {errors.product_id && <p className="text-red-500 text-sm">{errors.product_id}</p>}
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="supplier_name" value="Nama Supplier" />
                <input
                id="supplier_name"
                type="text"
                name="supplier_name"
                className="mt-1 block w-full border p-2 rounded-md"
                placeholder="Nama Supplier"
                value={data.supplier_name}
                readOnly
                />
                {errors.supplier_name && <p className="text-red-500 text-sm">{errors.supplier_name}</p>}
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="qty" value="Jumlah Produk" />
                <input
                id="qty"
                type="number"
                name="qty"
                className="mt-1 block w-full border p-2 rounded-md"
                placeholder="Jumlah Produk Masuk"
                value={data.qty}
                onChange={(e) => setData("qty", e.target.value)}
                />
                {errors.qty && <p className="text-red-500 text-sm">{errors.qty}</p>}
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="receiver" value="Penerima" />
                <input
                id="receiver"
                type="text"
                name="receiver"
                className="mt-1 block w-full border p-2 rounded-md"
                placeholder="Nama Penerima"
                value={data.receiver}
                onChange={(e) => setData("receiver", e.target.value)}
                />
                {errors.receiver && <p className="text-red-500 text-sm">{errors.receiver}</p>}
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="pic" value="Penerima Produk" />
                <input
                id="pic"
                type="text"
                name="pic"
                className="mt-1 block w-full border p-2 rounded-md"
                placeholder="Nama Penerima Produk"
                value={data.pic}
                onChange={(e) => setData("pic", e.target.value)}
                />
                {errors.pic && <p className="text-red-500 text-sm">{errors.pic}</p>}
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