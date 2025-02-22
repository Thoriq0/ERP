import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import React, { useState } from "react";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";
import Select from "react-select";

export function ButtonModalInbound({ userRole, productData }) {
  // State untuk form
  const [values, setValues] = useState({
    product: null,
    qty: "",
    pic: "",
    image: null,
  });

  // Untuk Disabled Feild
  const [supplierName, setSupplierName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  // State untuk error
  const [errors, setErrors] = useState({});

  // SET DROPDOWN SEARCH  
  const productOptions = productData.map((prod) => ({
    value: prod.id,
    label: prod.name,
  }));

  // Handle perubahan input
  function handleSelectChange(name, selectedOption) {
    const selectedProduct = productData.find((prod) => prod.id === selectedOption?.value);
    
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
    setSupplierName(selectedProduct?.supplier?.name || "");
    setCategoryName(selectedProduct?.category?.name || "");
  }

  function handleChange(e) {
    const { name, value, type, files } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  // Handle submit
  function handleSubmit(e) {
    e.preventDefault();
    setErrors({}); // Reset error sebelum submit

    // Mapping role endpoint
    const rolePaths = {
      admin: "/admin/inbound",
      wrhs: "/wrhs/inbound",
    };

    const userPath = rolePaths[userRole];
    
    // Kirim data ke backend
    router.post(
      userPath,
      {
        ...values,
        product: values.product?.value || "",
      },
      {
        forceFormData: true,
        onSuccess: () => {
          toast.success("Produk berhasil disimpan! 🎉", { duration: 5000 });
          setValues({ product: null, qty: "", pic: "", image: null });
          setSupplierName("");
          setCategoryName("");
        },
        onError: (err) => {
          setErrors(err);
          toast.error("Gagal menyimpan produk! ❌", { duration: 5000 });
        },
      }
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-PurpleFive hover:bg-primaryPurple">Create</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Data Produk Masuk</DialogTitle>
          <DialogDescription>Masukkan data produk yang masuk, lalu klik Simpan.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="product" value="Product" />
            <Select
              id="product"
              options={productOptions}
              isSearchable={true}
              placeholder="Pilih Product"
              value={values.product}
              onChange={(selected) => handleSelectChange("product", selected)}
              className="mt-1"
            />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="qty" value="Jumlah Produk" />
            <TextInput
              id="qty"
              type="number"
              name="qty"
              className="mt-1 block w-full"
              placeholder="Jumlah Produk Masuk"
              value={values.qty}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="pic" value="Penerima Produk" />
            <TextInput
              id="pic"
              type="text"
              name="pic"
              className="mt-1 block w-full"
              placeholder="Nama Penerima Produk"
              value={values.pic}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="supplierName" value="Nama Supplier" />
            <TextInput
              type="text"
              className="mt-1 block w-full bg-gray-200"
              value={supplierName}
              disabled
            />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="categoryName" value="Kategori Produk" />
            <TextInput
              type="text"
              className="mt-1 block w-full bg-gray-200"
              value={categoryName}
              disabled
            />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="image" value="Surat Terima" />
            <input
              id="image"
              type="file"
              accept="image/*"
              name="image"
              className="block w-full rounded-md text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleChange}
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-PurpleFive hover:bg-primaryPurple mt-5">
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
