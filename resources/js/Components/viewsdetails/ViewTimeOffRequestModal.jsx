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

export function ViewTimeOffRequestModal({ open, onClose, userRole, employee }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] max-w-[370px] md:max-w-[750px] overflow-y-auto border border-gray-300 p-5 md:p-10 rounded-md">
        <DialogHeader>
          <DialogTitle>Detail Data Time Off Request Employee</DialogTitle>
          <DialogDescription>
           Here are the data time off request employee details.
          </DialogDescription>
          <hr  />
        </DialogHeader>
        <div className="mt-4 space-y-2 text-sm md:text-md">
          <div className="flex">
            <strong className="min-w-[150px]">Name Employee</strong>
            <span className="mr-2">:</span>
            <span>{employee?.createdBy || "Unknow"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Reason</strong>
            <span className="mr-2">:</span>
            <span>{employee?.note || "Unknow"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Date of Leave</strong>
            <span className="mr-2">:</span>
            <span className="capitalize">{employee?.dueto || "Unknow"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Status</strong>
            <span className="mr-2">:</span>
            <span className="capitalize">{employee?.status || "Unknow"}</span>
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