import React, {useState} from "react";
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

export function ViewOutboundDetailModal({ open, onClose, outbound, productData, user, userRole }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  // GET ID PIC OUTBOUND
  let picId = outbound === null ? null : parseInt(outbound.pic);

  const product = productData.find(prod => prod.id === outbound?.product_id);
  const userGetProduct = user.find(usr => usr.id === picId);

  const images = outbound?.image ? JSON.parse(outbound.image) : [];
  const pdfs = outbound?.document ? JSON.parse(outbound.document) : [];
  
  const handleDownload = (file, type) => {
    const path = type === "image" ? `/images/outbounds/` : `/pdfs/outbounds/`;
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
    if (!fileToDelete || !outbound) {
      toast.error("Gagal menghapus file! ❌");
      return;
    }

    const rolePaths = {
      admin: "/admin/outbounddelete",
      wrhs: "/wrhs/outbounddelete",
    };
    const userPath = rolePaths[userRole];

    if (!userPath) {
      toast.error("Role user tidak valid! ❌");
      return;
    }

    router.post(userPath, {
      data: { fileName: fileToDelete, outboundId: outbound.id },
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
      <DialogContent className="max-h-[500px] max-w-[375px] md:max-w-[750px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Detail Data Outbound</DialogTitle>
          <DialogDescription>
            Berikut adalah detail data outbound.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border p-4 rounded-md">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg mb-5">Detail Produk</h3>
              <div className="flex">
                <strong className="min-w-[150px]">Nama Product</strong>
                <span className="mr-2">:</span>
                <span>{product?.name || "Tidak Diketahui"}</span>
              </div>
              <div className="flex">
                <strong className="min-w-[150px]">Category Product</strong>
                <span className="mr-2">:</span>
                <span>{product?.category?.name || "Tidak Diketahui"}</span>
              </div>
              <div className="flex">
                <strong className="min-w-[150px]">QTY:</strong>
                <span className="mr-2">:</span>
                <span>{outbound?.qty || "Tidak Diketahui"}</span>
              </div>
              <div className="flex">
                <strong className="min-w-[150px]">PIC</strong>
                <span className="mr-2">:</span>
                <span className="break-all">{userGetProduct?.name || "Tidak Diketahui"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg mb-5">Detail Penerima</h3>
              <div className="flex">
                <strong className="min-w-[150px]">Nama Penerima</strong>
                <span className="mr-2">:</span>
                <span>{outbound === null ? 'Tidak Terdaftar' : outbound.receiver }</span>
              </div>
              <div className="flex">
                <strong className="min-w-[150px]">Alamat</strong>
                <span className="mr-2">:</span>
                <span className="break-all ">
                  {outbound === null ? "Tidak Terdaftar" : outbound.address}
                </span>
              </div>
            </div>
          </div>

        <div className="mt-4 space-y-2">
          <div className="flex">
            <strong className="min-w-[150px]">Tanggal Keluar</strong>
            <span className="mr-2">:</span>
            <span>{new Date(outbound?.created_at).toLocaleString("id-ID")}</span>
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
        <DialogFooter>
          <Button
            type="button"
            className="max-w-[100px] md:w-full bg-gray-200 text-black border border-gray-400 mt-5 hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </Button>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>

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