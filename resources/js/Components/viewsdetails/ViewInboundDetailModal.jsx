import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { router } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export function ViewInboundDetailModal({ open, onClose, inbound, productData, user, userRole }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  const product = productData.find(prod => prod.id === inbound?.product_id);
  const userGetProduct = user.find(usr => usr.id === inbound?.pic);
  
  const images = inbound?.image ? JSON.parse(inbound.image) : [];
  const pdfs = inbound?.pdf ? JSON.parse(inbound.pdf) : [];
  
  const handleDownload = (file, type) => {
    const path = type === "image" ? `/images/inbounds/` : `/pdfs/inbounds/`;
    const link = document.createElement("a");
    link.href = path + file;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmDeleteFile = (file) => {
    setFileToDelete(file);
    setConfirmDelete(true);
  };

  const handleDeleteFile = () => {
    if (!fileToDelete || !inbound) {
      toast.error("Gagal menghapus file! ❌");
      return;
    }

    const rolePaths = {
      admin: "/admin/deletefile",
      wrhs: "/wrhs/deletefile",
    };
    const userPath = rolePaths[userRole];

    if (!userPath) {
      toast.error("Role user tidak valid! ❌");
      return;
    }

    router.post(userPath, {
      data: { fileName: fileToDelete, inboundId: inbound.id },
      onSuccess: () => {
        setConfirmDelete(false);
        toast.success("File berhasil dihapus! 🗑️");
      },
      onError: () => {
        toast.error("Gagal menghapus file! ❌");
      },
    });
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-[375px] md:max-w-[750px] max-h-[550px] border p-8 md:p-10 rounded-lg shadow-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Inbound Data Details</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Here are the details of the inbound data.
              </DialogDescription>
            <hr />
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border p-4 rounded-md">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg mb-5">Details Product </h3>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Product:</span>
                <span className="ttext-end break-all pl-6">{product?.name || "Tidak Diketahui"}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Quantity:</span>
                <span>{inbound?.qty || "Tidak Diketahui"}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">PIC:</span>
                <span className="text-end break-all pl-6">{userGetProduct?.name || "Tidak Diketahui"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg mb-5">Details Supplier</h3>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Supplier:</span>
                <span className="text-end break-all pl-6">{product?.supplier?.name || "Tidak Diketahui"}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Contact:</span>
                <span className="text-end break-all pl-6">{product?.supplier?.contact || "Tidak Diketahui"}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Address:</span>
                <span className="text-end break-all pl-6">
                  {product?.supplier?.address || "Tidak Diketahui"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="space-y-2">
              <span>
                🧑🏻‍💼 created by {inbound?.created_by} at {" "}
                {(() => {
                  const rawDate = inbound?.created_at;
                  if (!rawDate) return "Unknown Date";

                  const date = new Date(rawDate);
                  return new Intl.DateTimeFormat("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).format(date);
                })()}
              </span><br />
              <span>
              {inbound?.qc_status === "check" 
                ? `🟢 QC Status Approved (${inbound?.qc_status})` 
                : `🕵️‍♂️ QC Status Under Review (${inbound?.qc_status})`}
              </span>
            </div>
          </div>
          

          <div className="mt-4 space-y-3">
            <strong className="block">Files</strong>
            <div className="space-y-2">
              <strong className="block">Images</strong>
              {images.map((file, index) => (
                <div key={index} className="flex items-center justify-between border rounded p-2">
                  <span className="cursor-pointer text-blue-600" onClick={() => handleDownload(file, "image")}>
                    🖼️ {file}
                  </span>
                  <Button className="bg-red-500 text-white px-2 py-1" onClick={() => confirmDeleteFile(file)}>
                    Delete
                  </Button>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <strong className="block">PDFs</strong>
              {pdfs.map((file, index) => (
                <div key={index} className="flex items-center justify-between border rounded p-2">
                  <span className="cursor-pointer text-blue-600" onClick={() => handleDownload(file, "pdf")}>
                    📄 {file}
                  </span>
                  <Button className="bg-red-500 text-white px-2 py-1" onClick={() => confirmDeleteFile(file)}>
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button className=" max-w-[100px] md:w-full bg-gray-300 text-black hover:bg-gray-400" onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Konfirmasi Hapus */}
      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent className="max-w-md border p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogDescription>
            Are you sure you want to delete the file ? <strong>{fileToDelete}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button className="bg-gray-300 text-black hover:bg-gray-400" onClick={() => setConfirmDelete(false)}>Cancel</Button>
            <Button className="bg-red-500 text-white hover:bg-red-600" onClick={() => {handleDeleteFile();onClose(); setConfirmDelete(false);}}>Yes, Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
