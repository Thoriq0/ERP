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
import { FaFileImport } from "react-icons/fa6";

export function ButtonModalImportInbound({userRole}) {
  // State untuk form
  const [values, setValues] = useState({
    name: "",
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
      admin: "/admin/category",
      wrhs: "/wrhs/category",
    };
  
    const userPath = rolePaths[userRole];


    // Kirim data ke backend
    router.post(
      userPath,
      values,
      {
        forceFormData: true,
        onSuccess: () => {
          toast.success("Produk berhasil disimpan! 🎉", {
            duration: 5000,
          });
          setValues({
            name: "",
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
        <Button className="bg-validateTimeRequest hover:bg-[#05603A]">
            <FaFileImport size={16}/>Import
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Import Data</DialogTitle>
          <DialogDescription>
            Masukkan file data inbound, lalu klik Simpan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
            <div className="mt-4">
                <InputLabel htmlFor="download" value="Download Template File Data Inbound" className="mb-2" />
                <div className="flex items-center">
                    <button className="bg-validateTimeRequest p-2 rounded-md text-white">Download</button>
                    <p className="text-[12px] ml-2">* jika belum atau ingin melihat template silahkan download</p>
                </div>   
            </div>
            <hr className="mt-5 bg-[#D5D7DA]"></hr>
            <div className="mt-4">
                <InputLabel htmlFor="image" value="Masukan File Data Inbound" className="mb-2" />
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
              Import
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
