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
import { router } from "@inertiajs/react";

export function UpdateTimeModal({ userRole, open, onClose, employee, time }) {
  const { flash } = usePage().props;

  const { data, setData, errors, setErrors, put, reset } = useForm({
    note: "",
    dueto: [],
  });
  console.log(userRole)
  // Inisialisasi data jika time tersedia
  useEffect(() => {
    if (time) {
      let parsedDates = [];
      try {
        parsedDates = JSON.parse(time.dueto || "[]");
      } catch (err) {
        console.error("Gagal parse dueto:", err);
      }
  
      setData({
        note: time.note || "",
        dueto: Array.isArray(parsedDates) ? parsedDates : [],
      });
    }
  }, [time]);

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success, { duration: 5000 });
      onClose();
    }
    if (flash?.error) {
      toast.error(flash.error, { duration: 5000 });
    }
  }, [flash]);

  const handleAddDate = () => {
    setData("dueto", [...data.dueto, ""]);
  };

  const handleDateChange = (index, value) => {
    const newDates = [...data.dueto];
    newDates[index] = value;
    setData("dueto", newDates);
  };

  const handleRemoveDate = (index) => {
    const newDates = data.dueto.filter((_, i) => i !== index);
    setData("dueto", newDates);
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const rolePaths = {
      staff : `/staff/time/${time.id}`,
      admin : `/admin/time/${time.id}`,
      wrhs : `/wrhs/time/${time.id}`,
      fnc : `/fnc/time/${time.id}`,
      hr : `/hr/time/${time.id}`,
    }

    const userPath = rolePaths[userRole];

    put(userPath, {
      ...data,
      dueto: JSON.stringify(data.dueto),
    }, {
      onError: (errors) => {
        setErrors(errors);
        toast.error("Gagal memperbarui data! ❌");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
      <DialogHeader>
        <DialogTitle>Update Leave Data</DialogTitle>
        <DialogDescription>
          Update the notes and leave dates for the employee.
        </DialogDescription>
      </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="note" value="Catatan" />
            <textarea
              id="note"
              className="w-full border p-2 rounded-md"
              value={data.note}
              onChange={(e) => setData("note", e.target.value)}
            ></textarea>
            {errors.note && <p className="text-red-500 text-sm">{errors.note}</p>}
          </div>

          <div className="mt-4">
            <InputLabel value="Tanggal Cuti" />
            {data.dueto.map((tanggal, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <input
                  type="date"
                  className="border p-2 rounded-md w-full"
                  value={tanggal}
                  onChange={(e) => handleDateChange(index, e.target.value)}
                />
                <Button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => handleRemoveDate(index)}
                >
                  Hapus
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={handleAddDate}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Tambah Tanggal
            </Button>
            {errors.dueto && <p className="text-red-500 text-sm">{errors.dueto}</p>}
          </div>

          <DialogFooter>
            <Button
              type="button"
              className="bg-gray-200 text-black border border-gray-400 mt-5 hover:bg-gray-300"
              onClick={onClose}
            >
              Batal
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
