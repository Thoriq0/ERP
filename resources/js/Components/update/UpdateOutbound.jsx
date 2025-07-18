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
import Select from "react-select";

export function UpdateOutboundModal({ userRole, open, onClose, outbound, productData, dataStocks }) {
  const { flash } = usePage().props;
  const { data, setData, errors, setErrors, put, reset } = useForm({
    product_id: outbound?.product_id || "",
    supplier_name: "",
    qty: outbound?.qty || "",
    receiver: outbound?.receiver || "",
    address: outbound?.address || ""
  });

  const productOptions = dataStocks.map(stock => ({
    value: stock.product.id, 
    label: `${stock.product.name} - ${stock.qty} QTY`
  }));

  // Menampilkan toast untuk success atau error
  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success, { duration: 5000 });
      onClose();
    }
    if (flash?.error) {
      toast.error(flash.error, { duration: 5000 });
    }
  }, [flash]);

  useEffect(() => {
    if (outbound) {
      const selectedProduct = productData.find(prod => prod.id === outbound.product_id);
      
      setData({
        product_id: outbound.product_id,
        supplier_name: selectedProduct?.supplier?.name || "Unknown",
        qty: outbound.qty,
        receiver: outbound.receiver,
        address: outbound.address
      });
    }
  }, [outbound, productData]);

  function handleSubmit(e) {
    e.preventDefault();

    const rolePaths = {
      admin: `/admin/outbound`,
      wrhs: `/wrhs/outbound`,
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
          toast.success("Outbound data updated successfully! 🎉");
          reset();
          onClose();
        },
        onError: (err) => {
          setErrors(err);
          toast.error("Failed to update Outbound Data! ❌");
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
            Update the outbound data, then click Save.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <InputLabel htmlFor="product_id" value="Product" />
              <Select
                id="product_id"
                name="product_id"
                options={productOptions}
                isSearchable={true}
                placeholder="Select Product"
                value={productOptions.find(opt => opt.value === data.product_id)}
                onChange={(selected) => {
                  const selectedStock = dataStocks.find(
                    (stock) => stock.product.id === selected.value
                  );
                  setData("product_id", selected.value);
                  setData("supplier_name", selectedStock?.product?.supplier?.name || "Tidak Diketahui");
                }}
                className="mt-1 block w-full border p-2 rounded-md"
              />
              {errors.product_id && <p className="text-red-500 text-sm">{errors.product_id}</p>}
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="supplier_name" value="Name Supplier" />
                <input
                id="supplier_name"
                type="text"
                name="supplier_name"
                className="mt-1 block w-full border p-2 rounded-md"
                placeholder="Name Supplier"
                value={data.supplier_name}
                readOnly
                />
                {errors.supplier_name && <p className="text-red-500 text-sm">{errors.supplier_name}</p>}
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="qty" value="Total Product" />
                <input
                id="qty"
                type="number"
                name="qty"
                className="mt-1 block w-full border p-2 rounded-md"
                placeholder="Total Product Entry"
                value={data.qty}
                onChange={(e) => setData("qty", e.target.value)}
                />
                {errors.qty && <p className="text-red-500 text-sm">{errors.qty}</p>}
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="receiver" value="Receiver" />
                <input
                id="receiver"
                type="text"
                name="receiver"
                className="mt-1 block w-full border p-2 rounded-md"
                placeholder="Name Receiver"
                value={data.receiver}
                onChange={(e) => setData("receiver", e.target.value)}
                />
                {errors.receiver && <p className="text-red-500 text-sm">{errors.receiver}</p>}
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="address" value="Address" />
                <textarea
                id="address"
                name="address"
                className="mt-1 block w-full border p-2 rounded-md"
                placeholder="Address"
                value={data.address}
                onChange={(e) => setData("address", e.target.value)}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>
            {/* <div className="mt-4">
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
            </div> */}

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