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
import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast"; 
import { Textarea } from "flowbite-react";
import DatePicker from "react-multi-date-picker";

export function ButtonModalTimeRequest({userRole, userName, employeeData}) {
  // State untuk form
  const [values, setValues] = useState({
    name: userName,
    note: "",
    leave_dates: [],
    employee_id: null, 
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

  useEffect(() => {
    if (employeeData) {
      setValues((prev) => ({
        ...prev,
        name: employeeData.name,
        employee_id: employeeData.id,
      }));
    }
  }, [employeeData]);
  

  // Handle submit
  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
  
    const rolePaths = {
      admin: "/admin/timeoff",
      wrhs: "/wrhs/timeoff",
      fnc: "/fnc/timeoff",
      hr: "/hr/timeoff",
      staff: "/staff/timeoff"
    };
  
    const userPath = rolePaths[userRole];
  
    // Konversi tanggal ke string
    const formattedDates = values.leave_dates?.map(date =>
      date.format?.("YYYY-MM-DD") || date // fallback kalau udah string
    );
  
    const payload = {
      ...values,
      leave_dates: formattedDates,
    };
  
    router.post(userPath, payload, {
      forceFormData: true,
      onSuccess: () => {
        toast.success("Cuti berhasil disimpan! 🎉", {
          duration: 5000,
        });
        setValues({
          name: employeeData.name,
          note: "",
          leave_dates: [],
          employee_id: employeeData.id,
        });
      },
      onError: (err) => {
        setErrors(err);
        toast.error("Gagal menyimpan data cuti! ❌", {
          duration: 5000,
        });
      },
    });
  }
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-PurpleFive hover:bg-primaryPurple">Create</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Data Cuti Karyawan</DialogTitle>
          <DialogDescription>
            Masukkan data Cut karyawan, lalu klik Simpan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="name" value="Nama Karyawan" />
            <TextInput
              id="name"
              type="text"
              name="name"
              className="mt-1 block w-full bg-slate-200"
              placeholder={userName}
              value={values.name}
              readOnly
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="note" value="Alasan Cuti" />
            <Textarea
              id="note"
              name="note"
              className="mt-1 block w-full"
              placeholder="Contoh: Sakit, Keperluan keluarga, dll"
              value={values.note}
              onChange={handleChange}
            />
            {errors.note && <p className="text-red-500 text-sm">{errors.note}</p>}
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="leave_dates" value="Tanggal Cuti" className=""/>
            <DatePicker
              multiple
              value={values.leave_dates}
              onChange={(dates) => setValues({ ...values, leave_dates: dates })}
              className="w-full mt-1"
            />
            {errors.leave_dates && (
              <p className="text-red-500 text-sm">{errors.leave_dates}</p>
            )}
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
