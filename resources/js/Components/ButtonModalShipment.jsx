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

export function ButtonModalShipment({ userRole, selectedId, shipment }) {
  const [values, setValues] = useState(
    selectedId.reduce((acc, id) => {
      acc[id] = { date: "" };
      return acc;
    }, {})
  );

  // Mapping ID dengan nama produk, shipment_id, dan outbound_id
  const selectedProducts = shipment.reduce((acc, item) => {
    acc[item.id] = {
      name: item.outbound.product?.name || "Unknown Product",
      shipment_id: item.id,
      outbound_id: item.outbound.id,
    };
    return acc;
  }, {});

  // State untuk error
  const [errors, setErrors] = useState({});

  // Handle perubahan input
  function handleChange(e, id) {
    const { value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: { ...prevValues[id], date: value },
    }));
  }

  // Handle submit
  function handleSubmit(e) {
    e.preventDefault();
    setErrors({}); // Reset error sebelum submit

    const rolePaths = {
      admin: "/admin/shipmentorder",
      wrhs: "/wrhs/shipmentorder",
    };

    const userPath = rolePaths[userRole];

    // Format data sebelum dikirim
    const formattedData = selectedId.map((id) => ({
      shipment_id: selectedProducts[id]?.shipment_id,
      outbound_id: selectedProducts[id]?.outbound_id,
      date: values[id]?.date,
    }));

    // Kirim data ke backend
    router.post(
      userPath,
      { shipments: formattedData },
      {
        forceFormData: true,
        onSuccess: () => {
          toast.success("Shipment saved successfully! 🎉", { duration: 5000 });
          setValues(
            selectedId.reduce((acc, id) => {
              acc[id] = { date: "" };
              return acc;
            }, {})
          );
        },
        onError: (err) => {
          setErrors(err);
          toast.error("Failed to save Shipment! ❌", { duration: 5000 });
        },
      }
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-PurpleFive hover:bg-primaryPurple">Process Shipment</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Shipment Data</DialogTitle>
          <DialogDescription>
            Enter the date for each product delivery, then click Save.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {selectedId.map((id) => (
            <div key={id} className="mt-4">
              <InputLabel htmlFor={`shipment-${id}`} value={`${selectedProducts[id]?.name} (ID: ${id})`} />
              <TextInput
                id={`shipment-${id}`}
                type="date"
                name={`shipment-${id}`}
                className="mt-1 block w-full"
                placeholder="Date"
                value={values[id]?.date || ""}
                onChange={(e) => handleChange(e, id)}
              />
              {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
            </div>
          ))}

          <DialogFooter>
            <Button type="submit" className="bg-PurpleFive hover:bg-primaryPurple mt-5">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
