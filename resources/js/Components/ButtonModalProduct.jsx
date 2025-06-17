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
import Select from "react-select";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

export function ButtonModalProduct({ userRole, categoryData, supplierData }) {
  const [values, setValues] = useState({
    name: "",
    category: null,
    supplier: null,
    sku: "", 
  });

  const [errors, setErrors] = useState({});

  const supplierOptions = supplierData.map((sup) => ({
    value: sup.id,
    label: sup.name,
  }));

  const categoryOptions = categoryData.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  function generateSKU(name, supplier, category) {
    function getCode(str) {
        if (!str) return ""; // Jika null atau undefined, langsung return kosong
        str = str.trim().replace(/\s+/g, " "); // Hapus spasi berlebih di awal, akhir, dan antar kata
    
        const words = str.split(" ");
        const length = words.length;
    
        if (length === 0) return ""; // Jika hasil split kosong, return kosong
        if (length === 1) {
            return words[0].substring(0, 3).toUpperCase();
        } else if (length === 2) {
            return (words[0][0] + words[1][0] + words[1].slice(-1)).toUpperCase();
        } else if (length === 3) {
            return (words[0][0] + words[1][0] + words[2][0]).toUpperCase();
        } else {
            return (words[0][0] + words[Math.floor(length / 2)][0] + words[length - 1][0]).toUpperCase();
        }
    }
  

    const nameCode = getCode(name);
    const supplierCode = getCode(supplier);
    const categoryCode = getCode(category);
    
    return `${nameCode}-${supplierCode}-${categoryCode}`;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => {
      const updatedValues = { ...prev, [name]: value };
      updatedValues.sku = generateSKU(
        updatedValues.name,
        updatedValues.supplier?.label,
        updatedValues.category?.label
      );
      return updatedValues;
    });
  }

  function handleSelectChange(name, selectedOption) {
    setValues((prev) => {
      const updatedValues = { ...prev, [name]: selectedOption };
      updatedValues.sku = generateSKU(
        updatedValues.name,
        updatedValues.supplier?.label,
        updatedValues.category?.label
      );
      return updatedValues;
    });
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
          setValues({ name: "", category: null, supplier: null, sku: "" });
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
        <DialogTitle>Product Data</DialogTitle>
        <DialogDescription>
          Fill in the product details, then click Save.
        </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Product Name" />
            <input
              id="name"
              type="text"
              name="name"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Product Name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Dropdown Kategori */}
          <div className="mt-4">
            <InputLabel htmlFor="category" value="Category" />
            <Select
              id="category"
              options={categoryOptions}
              isSearchable={true}
              placeholder="Select Categories"
              value={values.category}
              onChange={(selected) => handleSelectChange("category", selected)}
              className="mt-1"
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          {/* Dropdown Supplier */}
          <div className="mt-4">
            <InputLabel htmlFor="supplier" value="Supplier" />
            <Select
              id="supplier"
              options={supplierOptions}
              isSearchable={true}
              placeholder="Select Supplier's"
              value={values.supplier}
              onChange={(selected) => handleSelectChange("supplier", selected)}
              className="mt-1"
            />
            {errors.supplier && <p className="text-red-500 text-sm">{errors.supplier}</p>}
          </div>

          {/* SKU Display */}
          <div className="mt-4">
            <InputLabel htmlFor="sku" value="SKU" />
            <input
              id="sku"
              type="text"
              name="sku"
              className="mt-1 block w-full border p-2 rounded-md bg-gray-200"
              value={values.sku}
              readOnly
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="bg-PurpleFive hover:bg-primaryPurple mt-5">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}