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

export function UpdateInboundModal({ userRole, open, onClose, inbound, productData, user }) {
  const { flash } = usePage().props;
  const { data, setData, errors, setErrors, post } = useForm({
    product_id: inbound?.product_id ?? "",
    qty: Number(inbound?.qty) ?? 0,
    pic: inbound?.pic ?? "",
    image: null,
    document: null,
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

  const [picName, setPicName] = useState("Tidak Di Ketahui");

  // Handle perubahan input pada select produk
  function handleSelectChange(name, selectedOption) {
    const selectedProduct = productData.find((prod) => prod.id === selectedOption?.value);

    setData((prev) => ({
      ...prev,
      [name]: selectedOption,
    }));

    setSelectedProduct({
      supplierName: selectedProduct?.supplier?.name ?? "",
      categoryName: selectedProduct?.category?.name ?? "",
      product: selectedOption,
    });
    
  }

  // Handle perubahan input selain select
  function handleChange(e) {
    const { name, value, type, files } = e.target;
    // Ambil maksimal 4 file
    // const selectedFiles = Array.from(files).slice(0, 4);
    setData((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? Array.from(files) : value,
    }));

  }

  useEffect(() => {
    if (inbound) {
      const selectedProduct = productData.find((prod) => prod.id === inbound.product_id);
      const foundUser = user.find((usr) => usr.id === inbound.pic);
      setData({
        product_id: inbound.product_id,
        qty: inbound?.qty ?? 0,
        pic: inbound?.pic ?? "",
        qcs: inbound?.qc_status ?? "",
      });

      setSelectedProduct({
        supplierName: selectedProduct?.supplier?.name ?? "",
        categoryName: selectedProduct?.category?.name ?? "",
        product: { value: inbound.product_id, label: selectedProduct?.name ?? "" },
      });

      setPicName(foundUser?.name ?? "Tidak Diketahui");
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

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if ((key === "image" || key === "document") && value) {
        for (let i = 0; i < value.length; i++) {
          formData.append(`${key}[]`, value[i]); 
        }
      } else {
        formData.append(key, value?.value || value);
      }
    });

    const userPath = rolePaths[userRole];
    console.log([...formData.entries()]);
    post(userPath, formData, {
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
          <DialogTitle>Update Inbound Data</DialogTitle>
          <DialogDescription>
            Update the inbound data, then click Save.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {data.qcs === 'checking' || data.qcs === 'Checking' || data.qcs === 'CHECKING' ? (
            <>
            <div className="mt-4">
              <InputLabel htmlFor="product_id" value="Product" />
              <Select
                id="product"
                options={productOptions}
                isSearchable={true}
                placeholder="Select Product"
                value={selectedProduct?.product ?? ""}
                onChange={(selected) => handleSelectChange("product", selected)}
                className="mt-1"
                // isDisabled={true}
              />
              {errors.product_id && <p className="text-red-500 text-sm">{errors.product_id}</p>}
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="qty" value="Quantity Product" />
              <input
                id="qty"
                type="number"
                name="qty"
                className="mt-1 block w-full border p-2 rounded-md"
                placeholder="Quantity Product"
                value={data?.qty ?? 0}
                onChange={(e) => setData("qty", e.target.value)}
              />
              {errors.qty && <p className="text-red-500 text-sm">{errors.qty}</p>}
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="pic" value="PIC" />
              <input
                id="pic"
                type="text"
                name="pic"
                className="mt-1 block w-full border p-2 rounded-md bg-gray-200"
                placeholder="PIC"
                value={picName ?? ""}
                onChange={(e) => setData("pic", e.target.value)}
                readOnly
              />
              {errors.pic && <p className="text-red-500 text-sm">{errors.pic}</p>}
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="supplierName" value="Supplier Name" />
              <TextInput
                type="text"
                className="mt-1 block w-full bg-gray-200"
                value={selectedProduct?.supplierName ?? ""}
                disabled
              />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="categoryName" value="Category Product" />
              <TextInput
                type="text"
                className="mt-1 block w-full bg-gray-200"
                value={selectedProduct?.categoryName ?? ""}
                disabled
              />
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="image" value="Attach Photo" />
              <input
                id="image"
                type="file"
                accept="image/*"
                name="image"
                multiple
                className="block w-full rounded-md text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleChange}
              />
              <span className="text-gray-500 text-xs">- Maximum photo size: 2 MB (JPEG, PNG, JPG)</span>
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="document" value="Attach Document" />
              <input
                id="document"
                type="file"
                accept="application/pdf"
                multiple
                name="document"
                className="block w-full rounded-md text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleChange}
              />
              <span className="text-gray-500 text-xs">- Maximum document size: 5 MB (PDF)</span>
            </div>
            </>
          ) : (
            <>
            <div className="mt-4">
              <InputLabel htmlFor="image" value="Attach Photo" />
              <input
                id="image"
                type="file"
                accept="image/*"
                name="image"
                multiple
                className="block w-full rounded-md text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleChange}
              />
              <span className="text-gray-500 text-xs">- Maximum photo size: 2 MB (JPEG, PNG, JPG)</span>
            </div>

            <div className="mt-4">
              <InputLabel htmlFor="document" value="Attach Document" />
              <input
                id="document"
                type="file"
                accept="application/pdf"
                multiple
                name="document"
                className="block w-full rounded-md text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleChange}
              />
              <span className="text-gray-500 text-xs">- Maximum document size: 5 MB (PDF)</span>
            </div>
            </>
          )}

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
