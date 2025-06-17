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
import { FaFileExport } from "react-icons/fa6";

export function ButtonModalImportInbound({userRole}) {
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const [open, setOpen] = useState(false);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    
    if (!file) {
      toast.error("Harap pilih file sebelum mengimpor!");
      return;
    }

    const rolePaths = {
      admin: "/admin/ibnd/",
      wrhs: "/wrhs/ibnd/",
    };

    const userPath = rolePaths[userRole];

    if (!userPath) {
        toast.error("Role tidak valid! ❌");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    router.post(userPath, formData, {
      forceFormData: true,
      onSuccess: () => {
        toast.success("File berhasil diunggah! 🎉");
        setFile(null);
        setOpen(false);
      },
      onError: (err) => {
        setErrors(err);
        toast.error("Gagal mengunggah file! ❌");
      },
    });
  }

  function handleExport() {
    const rolePaths = {
      admin: "/admin/inbound/export",
      wrhs: "/wrhs/inbound/export",
    };
  
    const userExportPath = rolePaths[userRole];
  
    if (!userExportPath) {
      toast.error("Role tidak valid! ❌");
      return;
    }
  
    window.location.href = userExportPath;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#0E9F6E] hover:bg-[#0C8B60]">
            <FaFileImport size={16}/>Import
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Import Data</DialogTitle>
          <DialogDescription>
            Upload the inbound data file, then click Save.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
            <div className="mt-4">
                <InputLabel htmlFor="download" value="Download Template File Data Inbound" className="mb-2" />
                <div className="flex items-center">
                    <button onClick={handleExport} className="bg-[#0E9F6E] hover:bg-[#0C8B60] p-2 rounded-md text-white w-[300px]"> Download <FaFileExport size={16} className="inline-block"/></button>
                    <p className="text-[12px] ml-2">Template for importing inbound data : Please ensure the id_product column is filled with the corresponding ID from the Product sheet. The Product sheet will not be included in the import process.</p>
                </div>   
            </div>
            <hr className="mt-5 bg-[#D5D7DA]"></hr>
            <div className="mt-4">
              <InputLabel htmlFor="file" value="Upload File Data Inbound" className="mb-2" />
              <input
                id="file"
                type="file"
                accept=".csv,.xlsx,.xls"
                name="file"
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
