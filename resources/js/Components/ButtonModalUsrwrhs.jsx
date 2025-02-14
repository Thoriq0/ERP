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

export function ButtonModalUsrwrhs() {
  // State untuk form
  const [values, setValues] = useState({
    name: "",
    role: "admin",
    email: "",
    password: "",
    address: "",
    status: "active",
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
      "/admin/user",
      values,
      {
        forceFormData: true, // Supaya file bisa dikirim
        onSuccess: () => {
          toast.success("Pengguna berhasil disimpan! 🎉", {
            duration: 5000,
          });
          setValues({
            name: "",
            role: "",
            email: "admin",
            address: "",
            password: "",
            status: "active",
          });
        },
        onError: (err) => {
          setErrors(err); // Simpan error ke state
          toast.error("Gagal menyimpan pengguna! ❌", {
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
          <DialogTitle>Data Karyawan Baru</DialogTitle>
          <DialogDescription>
            Masukkan data karyawan yang baru, lalu klik Simpan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Nama" />
            <TextInput
              id="name"
              type="text"
              name="name"
              className="mt-1 block w-full"
              placeholder="Nama"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
              id="email"
              type="text"
              name="email"
              className="mt-1 block w-full"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password" value="Password" />
            <TextInput
              id="password"
              type="text"
              name="password"
              className="mt-1 block w-full"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="role" value="Role" />
            <select
              id="role"
              name="role"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-purple-500 outline-none"
              value={values.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="fnc">Finance</option>
              <option value="hr">Human Resource</option>
              <option value="wrhs">Warehouse</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="address" value="Address" />
            <TextInput
              id="address"
              type="text"
              name="address"
              className="mt-1 block w-full"
              placeholder="Address"
              value={values.address}
              onChange={handleChange}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="status" value="Status" />
            <select
              id="status"
              name="status"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-purple-500 outline-none"
              value={values.status}
              onChange={handleChange}
            >
              <option value="active" className="outline-none">Active</option>
              <option value="not active" className="outline-none">Not Active</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
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
