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

export function ButtonModalInbound() {
  // State untuk form
  const [values, setValues] = useState({
    product: "",
    qty: "",
    supplier: "",
    category: "",
    pic: "",
    image: null,
  });

  // State untuk error
  const [errors, setErrors] = useState({});

  // Handle perubahan input
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

    // Kirim data ke backend
    router.post(
      "/admin/inbound",
      values,
      {
        forceFormData: true, // Supaya file bisa dikirim
        onSuccess: () => {
          toast.success("Produk berhasil disimpan! 🎉", {
            duration: 5000,
          });
          setValues({
            product: "",
            qty: "",
            supplier: "",
            category: "",
            pic: "",
            image: null,
          });
        },
        onError: (err) => {
          setErrors(err); // Simpan error ke state
          toast.error("Gagal menyimpan produk! ❌", {
              duration: 5000,
          });
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
            <InputLabel htmlFor="product" value="Nama Produk" />
            <TextInput
              id="product"
              type="text"
              name="product"
              className="mt-1 block w-full"
              placeholder="Nama Produk"
              value={values.product}
              onChange={handleChange}
            />
            {errors.product && <p className="text-red-500 text-sm">{errors.product}</p>}
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
            {errors.qty && <p className="text-red-500 text-sm">{errors.qty}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="supplier" value="Pemasok" />
            <TextInput
              id="supplier"
              type="text"
              name="supplier"
              className="mt-1 block w-full"
              placeholder="Nama Pemasok"
              value={values.supplier}
              onChange={handleChange}
            />
            {errors.supplier && <p className="text-red-500 text-sm">{errors.supplier}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="category" value="Kategori" />
            <TextInput
              id="category"
              type="text"
              name="category"
              className="mt-1 block w-full"
              placeholder="Kategori Produk"
              value={values.category}
              onChange={handleChange}
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
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
            {errors.pic && <p className="text-red-500 text-sm">{errors.pic}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="image" value="Surat Terima" />
            <input
              id="image"
              type="file"
              accept="image/*"
              name="image"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleChange}
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
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
