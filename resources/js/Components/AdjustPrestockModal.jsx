import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { Button } from "./ui/button";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { router, usePage } from "@inertiajs/react";

export default function AdjustPrestockModal({ products, onClose, userRole }) {
  const { props } = usePage();
  const errors = props.errors;
  const flash = props.flash;

  const [formValues, setFormValues] = useState(
    products.map((p) => ({
      id: p.id,
      name: p.name,
      inboundId: p.inboundId,
      quantity: "",
      note: "",
    }))
  );

  useEffect(() => {
    if (errors?.msg) {
      toast.error(errors.msg);
    }
  }, [errors]);

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    } else if (flash?.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  const handleChange = (index, field, value) => {
    const newValues = [...formValues];
    newValues[index][field] = value;
    setFormValues(newValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userPath = {
      admin: "/admin/prestock-adjust",
      wrhs: "/wrhs/prestock-adjust",
    }[userRole];

    router.post(
      userPath,
      { adjustments: formValues },
      {
        preserveScroll: true,
        onSuccess: () => {
          onClose(); // Modal ditutup kalau sukses
        },
        onError: () => {
          // Error ditangani otomatis oleh useEffect di atas
        },
      }
    );
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adjust Prestock</DialogTitle>
          <DialogDescription>
            Please provide the quantity and notes for each product to adjust failed inbound items.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {formValues.map((item, index) => (
            <div key={item.id} className="border-b pb-4 mb-4">
              <p className="font-semibold mb-2">{item.name}</p>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <InputLabel
                    htmlFor={`quantity-${item.id}`}
                    value="Adjust Stok"
                  />
                  <TextInput
                    id={`quantity-${item.id}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    required
                  />
                  <p className="text-[12px] text-gray-500">
                      Adjust the quantity based on the inspection results
                  </p>
                </div>

                <div className="flex-1">
                  <InputLabel htmlFor={`note-${item.id}`} value="Note" />
                  <textarea
                    id={`note-${item.id}`}
                    value={item.note}
                    onChange={(e) =>
                      handleChange(index, "note", e.target.value)
                    }
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[80px]"
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          <DialogFooter>
            <Button type="submit" className="bg-PurpleFive hover:bg-primaryPurple">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
