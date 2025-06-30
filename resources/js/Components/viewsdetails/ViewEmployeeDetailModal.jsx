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

export function ViewEmployeeDetailModal({ open, onClose, employee }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] max-w-[370px] md:max-w-[750px] overflow-y-auto border border-gray-300 p-5 md:p-10 rounded-md">
        <DialogHeader>
          <DialogTitle>Detail Employee Data</DialogTitle>
          <DialogDescription>
           Here are the employee data details.
          </DialogDescription>
          <hr  />
        </DialogHeader>
        <div className="mt-4 space-y-2 text-sm md:text-md">
          <div className="flex">
            <strong className="min-w-[150px]">Name Employee</strong>
            <span className="mr-2">:</span>
            <span>{employee?.name || "Unknow"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Email</strong>
            <span className="mr-2">:</span>
            <span>{employee?.email || "Unknow"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Departemen</strong>
            <span className="mr-2">:</span>
            <span className="capitalize">{employee?.departemen || "Unknow"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Date Of Birth</strong>
            <span className="mr-2">:</span>
            <span>{employee?.dateOfBirth || "Unknow"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Gender</strong>
            <span className="mr-2">:</span>
            <span className="capitalize">{employee?.gender || "Unknow"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Contact</strong>
            <span className="mr-2">:</span>
            <span>{employee?.phone || "Unknow"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Address</strong>
            <span className="mr-2">:</span>
            <span>{employee?.address || "Unknow"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Created Data</strong>
            <span className="mr-2">:</span>
            <span>{new Date(employee?.created_at).toLocaleString("id-ID")}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Last Update Data</strong>
            <span className="mr-2">:</span>
            <span>{new Date(employee?.updated_at).toLocaleString("id-ID")}</span>
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
  );
}