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
import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { usePage } from '@inertiajs/react';
import toast from "react-hot-toast";

export function ButtonModalAdjustStock({ userRole, selectedItems }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState([]);

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
        toast.success(flash.success);
        }
        if (flash.error) {
        toast.error(flash.error);
        }
    }, [flash]);
    
    useEffect(() => {

      const initialFormData = selectedItems.map(item => ({
        stockId: item.id,
        qty: item.qty,
        name: item.product.name,
        productId: item.product.id,
        status: "", 
        note: "",
      }));
      setFormData(initialFormData);
    }, [selectedItems]);
    
    const handleChange = (index, field, value) => {
      setFormData(prev => {
        const updated = [...prev];
        updated[index][field] = value;
        return updated;
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const endpoint = userRole === "admin" ? "/admin/adjust-stock" : "/wrhs/adjust-stock";
      
      router.post(endpoint, { items: formData }, {
        // onSuccess: () => {
        //   toast.success("Berhasil adjust stock!");
        //   setOpen(false);
        // },
        onError: () => {
          toast.error("Gagal adjust stock.");
        }
      });
    };
  
    return (
      <>
        <Button
          className="bg-primaryPurple text-white"
          disabled={selectedItems.length === 0}
          onClick={() => setOpen(true)}
        >
          Adjust Stock
        </Button>
  
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adjust Stock</DialogTitle>
              <DialogDescription>
                Fill in the stock data that you want to customize
              </DialogDescription>
            </DialogHeader>
  
            <form onSubmit={handleSubmit}>
              {formData.map((item, index) => (
                <div key={item.stockId} className="mb-6 border p-4 rounded">
                  <p className="mb-2 font-medium">{item.name}</p>
  
                  <InputLabel htmlFor={`qty-${index}`} value="New Qty" />
                  <TextInput
                    type="number"
                    id={`qty-${index}`}
                    value={item.qty}
                    onChange={(e) => handleChange(index, "qty", e.target.value)}
                    className="w-full"
                  />
  
                  <InputLabel htmlFor={`status-${index}`} value="Status" />
                  <select
                    id={`status-${index}`}
                    className="w-full mt-2 p-2 border rounded"
                    value={item.status}
                    onChange={(e) => handleChange(index, "status", e.target.value)}
                  >
                    <option value="">Pilih Status</option>
                    <option value="damage">Damage</option>
                    <option value="disposal">Disposal</option>
                    <option value="expired">Expired</option>
                    <option value="lost">Lost</option>
                    <option value="extra">Extra</option>
                  </select>
  
                  <InputLabel htmlFor={`note-${index}`} value="Notes" />
                  <textarea
                    type="text"
                    id={`note-${index}`}
                    value={item.note}
                    onChange={(e) => handleChange(index, "note", e.target.value)}
                    placeholder="Take Notes"
                    className="rounded-sm w-full"
                  />
                </div>
              ))}
  
              <DialogFooter>
                <Button type="submit" className="bg-PurpleFive hover:bg-primaryPurple text-white">
                  Save Adjustments
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }
  