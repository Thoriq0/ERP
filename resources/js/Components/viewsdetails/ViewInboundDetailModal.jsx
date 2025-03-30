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
        <DialogContent className="md:max-w-[680px] max-h-[550px] border p-6 rounded-lg shadow-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Detail Data Inbound</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Berikut adalah detail data inbound.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border p-4 rounded-md">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Detail Produk</h3>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Produk:</span>
                <span className="ttext-end break-all pl-6">{product?.name || "Tidak Diketahui"}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">QTY:</span>
                <span>{inbound?.qty || "Tidak Diketahui"}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Penerima:</span>
                <span className="text-end break-all pl-6">{userGetProduct?.name || "Tidak Diketahui"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Detail Supplier</h3>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Supplier:</span>
                <span className="text-end break-all pl-6">{product?.supplier?.name || "Tidak Diketahui"}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Kontak:</span>
                <span className="text-end break-all pl-6">{product?.supplier?.contact || "Tidak Diketahui"}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="font-medium">Alamat:</span>
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
                    Hapus
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
                    Hapus
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button className="bg-gray-300 text-black hover:bg-gray-400" onClick={onClose}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Konfirmasi Hapus */}
      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent className="max-w-md border p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus file <strong>{fileToDelete}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button className="bg-gray-300 text-black hover:bg-gray-400" onClick={() => setConfirmDelete(false)}>Batal</Button>
            <Button className="bg-red-500 text-white hover:bg-red-600" onClick={() => {handleDeleteFile();onClose(); setConfirmDelete(false);}}>Ya, Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
