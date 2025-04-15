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
import Select from "react-select";
import { useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import { router } from "@inertiajs/react"; 

export function UpdateEmployeeModal({ userRole, open, onClose, employee }) {
  const {flash} = usePage().props;
  const { data, setData, errors, setErrors, put, reset } = useForm({
    name: employee?.name || "",
  });

  const genderOptions = [
    { value: "male", label: "Laki-laki" },
    { value: "female", label: "Perempuan" },
    { value: "other", label: "Lainnya" }
  ];

  const departemenOptions = [
    { value: "warehouse", label: "Warehouse" },
    { value: "logistik", label: "Logistik" },
    { value: "humanResouce", label: "Human Resource(HR)" },
    { value: "finance", label: "Finance" }
  ];

  useEffect(() => {
    if (employee) {
      setData({
        name: employee.name || "",
        email: employee.email || "",
        departemen: employee.departemen || "",
        dateOfBirth: employee.dateOfBirth || "",
        gender: employee.gender || "",
        phone: employee.phone || "",
        address: employee.address || "",
        uniqueNumber: employee?.uniqueNumber || ""
      });
    }
  }, [employee]);
  
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
      admin: `/admin/employee/${employee?.id}`,
      hr: `/hr/employee/${employee?.id}`,
    };

    const userPath = rolePaths[userRole];
    
    put(userPath, data, {
      forceFormData: true,
      onError: (err) => {
        setErrors(err);
        toast.error("Gagal memperbarui Data Karyawan! ❌", { duration: 5000 });
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Update Karyawan Masuk</DialogTitle>
          <DialogDescription>
            Update data karyawan yang masuk, lalu klik Simpan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Nama Karyawan" />
            <input
              id="name"
              type="text"
              name="name"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Nama Karyawan"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="email" value="Email" />
            <input
              id="email"
              type="text"
              name="email"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Nama Email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          {/* dropdown departemen */}
          <div className="mt-4">
            <InputLabel htmlFor="departemen" value="Departemen" />
            <Select
                id="departemen"
                name="departemen"
                options={departemenOptions}
                placeholder="Pilih Departemen"
                value={departemenOptions.find(option => option.value === data.departemen)}
                onChange={(option) => setData("departemen", option.value)} 
                className="mt-1"
                />
                {errors.departemen && <p className="text-red-500 text-sm">{errors.departemen}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="dateOfBirth" value="Tanggal Lahir" />
            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Nama dateOfBirth"
              value={data.dateOfBirth}
              onChange={(e) => setData("dateOfBirth", e.target.value)}
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
          </div>
          {/* dropdown jenis kelamin */}
          <div className="mt-4">
            <InputLabel htmlFor="gender" value="Jenis Kelamin" />
            <Select
                id="gender"
                name="gender"
                options={genderOptions}
                placeholder="Pilih Jenis Kelamin"
                value={genderOptions.find(option => option.value === data.gender)}
                onChange={(option) => setData("gender", option.value)} 
                className="mt-1"
                />
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="phone" value="Nomor Handphone" />
            <input
              id="phone"
              type="text"
              name="phone"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Nomor Handphone"
              value={data.phone}
              onChange={(e) => setData("phone", e.target.value)}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="address" value="Alamat" />
            <input
              id="address"
              type="text"
              name="address"
              className="mt-1 block w-full border p-2 rounded-md"
              placeholder="Nama Alamat"
              value={data.address}
              onChange={(e) => setData("address", e.target.value)}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
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
