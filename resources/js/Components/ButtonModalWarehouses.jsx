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

export function ButtonModalWarehouses({userRole}) {
  // State untuk form
  const [values, setValues] = useState({
    name: "",
    location: "",
    address: "",
    operator: "",
    kontak: "",
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

    // Mapping role endpoint
    const rolePaths = {
      admin: "/admin/warehouse",
    };
  
    const userPath = rolePaths[userRole];


    // Kirim data ke backend
    router.post(
      userPath,
      values,
      {
        forceFormData: true,
        onSuccess: () => {
          toast.success("Warehouse berhasil dibuat! 🎉", {
            duration: 5000,
          });
          setValues({
            name: "",
          });
        },
        onError: (err) => {
          setErrors(err); // Simpan error ke state
          toast.error("Gagal menyimpan Kategori! ❌", {
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
          <DialogTitle>Data Warehouse</DialogTitle>
          <DialogDescription>
            Masukkan data warehouse, lalu klik Simpan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Nama Category" />
            <TextInput
              id="name"
              type="text"
              name="name"
              className="mt-1 block w-full"
              placeholder="Nama Category"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="location" value="Nama Lokasi" />
            <TextInput
              id="location"
              type="text"
              name="location"
              className="mt-1 block w-full"
              placeholder="Lokasi"
              value={values.location}
              onChange={handleChange}
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="address" value="Alamat Warehouse" />
            <TextInput
              id="address"
              type="text"
              name="address"
              className="mt-1 block w-full"
              placeholder="Alamat Warehouse"
              value={values.address}
              onChange={handleChange}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="operator" value="Nama operator" />
            <TextInput
              id="operator"
              type="text"
              name="operator"
              className="mt-1 block w-full"
              placeholder="Nama operator"
              value={values.operator}
              onChange={handleChange}
            />
            {errors.operator && <p className="text-red-500 text-sm">{errors.operator}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="contact" value="Nomor Operator" />
            <TextInput
              id="contact"
              type="number"
              name="contact"
              className="mt-1 block w-full"
              placeholder="Nomor Operator"
              value={values.contact}
              onChange={handleChange}
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
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
