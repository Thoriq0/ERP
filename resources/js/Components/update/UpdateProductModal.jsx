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

export function UpdateProductModal({ userRole, open, onClose, product, categoryData, supplierData }) {
  const {flash} = usePage().props;
  const [customSku, setCustomSku] = useState(false);
  const { data, setData, put, errors, setErrors, reset } = useForm({
    name: product?.name || "",
    category_id: product?.category_id || "",
    supplier_id: product?.supplier_id || "",
    sku: ""
  });
  
  function generateSKU(name, category, supplier) {
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
  
    return `${getCode(name)}-${getCode(supplier)}-${getCode(category)}`;
  }

  useEffect(() => {
    if (product) {
        const category = categoryData.find(cat => cat.id === product.category_id)?.name || "";
        const supplier = supplierData.find(sup => sup.id === product.supplier_id)?.name || "";

        setData({
            name: product.name || "",
            category_id: product.category_id || "",
            supplier_id: product.supplier_id || "",
            sku: generateSKU(product.name, category, supplier)
        });
    }
}, [product]);

useEffect(() => {
  const category = categoryData.find(cat => String(cat.id) === String(data.category_id))?.name || "";
  const supplier = supplierData.find(sup => String(sup.id) === String(data.supplier_id))?.name || "";
  
  setData("sku", generateSKU(data.name, category, supplier));
}, [data.name, data.category_id, data.supplier_id]);



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
    const rolePaths = {
      admin: `/admin/product/${product?.id}`,
      wrhs: `/wrhs/product/${product?.id}`,
    };

    const userPath = rolePaths[userRole];

    put(userPath, data, {
      forceFormData: true,
      onError: (errors) => {
        setErrors(errors);
        toast.error("Gagal memperbarui Data Produk! ❌");
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
                <div className="mt-4">
                    <InputLabel htmlFor="sku" value="SKU" />
                    <input
                        id="sku"
                        type="text"
                        name="sku"
                        className="mt-1 block w-full border p-2 rounded-md" 
                        value={data.sku}
                        onChange={(e) => setData("sku", e.target.value)}
                        readOnly={!customSku}
                    />
                    <div className="mt-2">
                        <input
                            type="checkbox"
                            id="customSku"
                            checked={customSku}
                            onChange={() => setCustomSku(!customSku)}
                        />
                        <label htmlFor="customSku" className="ml-2">Gunakan SKU Custom</label>
                    </div>
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