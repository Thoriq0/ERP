import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import TextInput from "../TextInput";
import { Button } from "../ui/button";
import InputLabel from "../InputLabel";
import { useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import Select from "react-select";

export function UpdateInboundModal({ userRole, open, onClose, inbound, productData }) {
  const { flash } = usePage().props;
  const { data, setData, errors, setErrors, put } = useForm({
    product_id: inbound?.product_id || "",
    qty: Number(inbound?.qty) || 0,
    pic: inbound?.pic || "",
  });

  // State untuk menyimpan produk yang dipilih
  const [selectedProduct, setSelectedProduct] = useState({
    product: null,
    supplierName: "",
    categoryName: "",
  });

  // Set dropdown options untuk produk
  const productOptions = productData.map((prod) => ({
    value: prod.id,
    label: prod.name,
  }));

  // Handle perubahan input pada select produk
  function handleSelectChange(name, selectedOption) {
    const selectedProduct = productData.find((prod) => prod.id === selectedOption?.value);

    setData((prev) => ({
      ...prev,
      [name]: selectedOption,
    }));

    setSelectedProduct({
      supplierName: selectedProduct?.supplier?.name || "",
      categoryName: selectedProduct?.category?.name || "",
      product: selectedOption,
    });
  }

  // Handle perubahan input selain select
  function handleChange(e) {
    const { name, value, type, files } = e.target;
    setData((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  useEffect(() => {
    if (inbound) {
      const selectedProduct = productData.find((prod) => prod.id === inbound.product_id);

      setData({
        product_id: inbound.product_id,
        qty: inbound.qty,
        pic: inbound.pic,
      });

      setSelectedProduct({
        supplierName: selectedProduct?.supplier?.name || "",
        categoryName: selectedProduct?.category?.name || "",
        product: { value: inbound.product_id, label: selectedProduct?.name || "" },
      });
      console.log("Inbound Data:", inbound);
      console.log("Selected Product on Initial:", selectedProduct);
    }
  }, [inbound, productData]);

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

  // Handle submit form
  function handleSubmit(e) {
    e.preventDefault();

    const rolePaths = {
      admin: `/admin/inbound/${inbound?.id}`,
      wrhs: `/wrhs/inbound/${inbound?.id}`,
    };

    const userPath = rolePaths[userRole];

    put(userPath, data, {
      forceFormData: true,
      onError: (errors) => {
        setErrors(errors);
        toast.error("Gagal memperbarui Data Inbound! ❌");
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Update Data Inbound</DialogTitle>
          <DialogDescription>
            Update data inbound yang masuk, lalu klik Simpan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="product_id" value="Product" />
            <Select
              id="product"
              options={productOptions}
              isSearchable={true}
              placeholder="Pilih Product"
              value={selectedProduct.product}
              onChange={(selected) => handleSelectChange("product", selected)}
              className="mt-1"
              isDisabled={true}
            />
            {errors.product_id && <p className="text-red-500 text-sm">{errors.product_id}</p>}
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

          <div className="mt-4">
            <InputLabel htmlFor="supplierName" value="Nama Supplier" />
            <TextInput
              type="text"
              className="mt-1 block w-full bg-gray-200"
              value={selectedProduct.supplierName}
              disabled
            />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="categoryName" value="Kategori Produk" />
            <TextInput
              type="text"
              className="mt-1 block w-full bg-gray-200"
              value={selectedProduct.categoryName}
              disabled
            />
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
