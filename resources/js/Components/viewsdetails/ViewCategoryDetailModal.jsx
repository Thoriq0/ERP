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

export function ViewCategoryDetailModal({ open, onClose, category }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[500px] max-w-[375px] md:max-w-[750px] overflow-y-auto border border-gray-300 p-8 md:p-10 rounded-md">
        <DialogHeader>
          <DialogTitle>Category Information</DialogTitle>
          <DialogDescription>
            This is the detailed information of the selected category.
          </DialogDescription>
          <hr />
        </DialogHeader>
        <div className="mt-4 space-y-2">
          <div className="flex">
            <strong className="min-w-[150px]">Category Name</strong>
            <span className="mr-2">:</span>
            <span>{category?.name || "Tidak Diketahui"}</span>
          </div>
          <div className="flex">
            <strong className="min-w-[150px]">Created At</strong>
            <span className="mr-2">:</span>
            <span>{new Date(category?.created_at).toLocaleString("id-ID")}</span>
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