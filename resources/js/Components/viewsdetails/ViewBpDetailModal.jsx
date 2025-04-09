import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

export function ViewBpDetailModal({ open, onClose, bp }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] max-w-[370px] md:max-w-[750px] overflow-y-auto border border-gray-300 p-7 md:p-10 rounded-md">
        <DialogHeader>
          <DialogTitle>Detail Data BP</DialogTitle>
          <DialogDescription>
            Berikut adalah detail data BP.
          </DialogDescription>
          <hr />
        </DialogHeader>
        <div className="mt-4 space-y-2 text-sm md:text-md">
          <div className="flex">
            <strong className="min-w-[150px]">Nama PT</strong>
            <span className="mr-2">:</span>
            <span>{bp?.bill_to || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Kontak</strong>
            <span className="mr-2">:</span>
            <span>{bp?.contact_bill || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Alamat</strong>
            <span className="mr-2">:</span>
            <span>{bp?.address_bill || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Email</strong>
            <span className="mr-2">:</span>
            <span>{bp?.email_bill || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Nomor Rekening</strong>
            <span className="mr-2">:</span>
            <span>{bp?.account_bill || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Pemilik Rekening</strong>
            <span className="mr-2">:</span>
            <span>{bp?.account_bill_name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Nama Bank</strong>
            <span className="mr-2">:</span>
            <span>{bp?.account_bank_name || "Tidak Diketahui"}</span>
          </div>
          {/* <div className="flex">
            <strong className="min-w-[150px]">Tanggal Masuk</strong>
            <span className="mr-2">:</span>
            <span>{bp?.created_at ? new Date(bp.created_at).toLocaleString("id-ID") : "Tidak Diketahui"}</span>
          </div> */}
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
  );
}
