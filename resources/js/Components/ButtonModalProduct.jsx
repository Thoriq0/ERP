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
import React, { useState } from "react";
import Select from "react-select"; // Import react-select
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

export function ButtonModalProduct({ userRole, categoryData, supplierData }) {
  const [values, setValues] = useState({
    name: "",
    category: null,  // Sesuai dengan react-select
    supplier: null,
  });

  const [errors, setErrors] = useState({});

  // I GOT CONFUSED
  const supplierOptions = supplierData.map((cat) => ({
    value: cat.id,
    label: cat.name
  }));

  const categoryOptions = categoryData.map((cat) => ({
    value: cat.id,
    label: cat.name
  }));

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectChange(name, selectedOption) {
    setValues((prev) => ({ ...prev, [name]: selectedOption }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    const rolePaths = {
      admin: "/admin/product",
      wrhs: "/wrhs/product",
    };

    const userPath = rolePaths[userRole];

    router.post(
      userPath,
      {
        ...values,
        category: values.category?.value || "",  
        supplier: values.supplier?.value || "",
      },
      {
        forceFormData: true,
        onSuccess: () => {
          toast.success("Produk berhasil disimpan! 🎉");
          setValues({ name: "", category: null, supplier: null });
        },
        onError: (err) => {
          setErrors(err);
          toast.error("Gagal menyimpan produk! ❌");
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
          <DialogDescription>
            Masukkan data produk yang masuk, lalu klik Simpan.
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
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Dropdown Kategori */}
          <div className="mt-4">
            <InputLabel htmlFor="category" value="Kategori" />
            <Select
              id="category"
              options={categoryOptions}
              isSearchable={true}
              placeholder="Pilih Kategori"
              value={values.category}
              onChange={(selected) => handleSelectChange("category", selected)}
              className="mt-1"
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          {/* Dropdown Supplier */}
          <div className="mt-4">
            <InputLabel htmlFor="supplier" value="Pemasok" />
            <Select
              id="supplier"
              options={supplierOptions}
              isSearchable={true}
              placeholder="Pilih Supplier"
              value={values.supplier}
              onChange={(selected) => handleSelectChange("supplier", selected)}
              className="mt-1"
            />
            {errors.supplier && <p className="text-red-500 text-sm">{errors.supplier}</p>}
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
