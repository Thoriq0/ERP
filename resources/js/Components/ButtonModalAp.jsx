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
import { router, usePage, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
};

export function ButtonModalAp({ userRole, bp }) {
  const { flash } = usePage().props;
  const [open, setOpen] = useState(false);
  const { data, setData, errors, setErrors, post, reset } = useForm({
    items: [{ description: "", qty: "", unit_price: "" }],
    discount: "",
    tax:"",
    note: "",
    terms_condition: "",
    total_amount: "",
    due_date: "",
    status_payment: "unpaid",
    bp: ""
  });

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success, { duration: 5000 });
      setOpen(false);
    }
    if (flash?.error) {
      toast.error(flash.error, { duration: 5000 });
    }
  }, [flash]);

  useEffect(() => {
    let total = data.items.reduce((acc, item) => {
      const qty = parseInt(item.qty) || 0;
      const unitPrice = parseFloat(item.unit_price) || 0;
      return acc + qty * unitPrice;
    }, 0);

    const discountValue = parseFloat(data.discount) || 0;
    const taxValue = parseFloat(data.tax) || 0;

    let totalAfterDiscount = total - (total * discountValue) / 100;
    let taxAmount = (totalAfterDiscount * taxValue) / 100;
    let finalTotal = totalAfterDiscount + taxAmount;

    setData("total_amount", finalTotal);
  }, [data.items, data.discount, data.tax]);

  function handleSubmit(e) {
    e.preventDefault();
    const rolePaths = {
      admin: `/admin/ap`,
      fnc: `/finance/ap`,
    };
    post(rolePaths[userRole], data, {
      forceFormData: true,
      onError: (errors) => {
        setErrors(errors);
        toast.error("Gagal menyimpan Data Account Payable! ❌");
      },
    });
  }

  function addItem() {
    setData("items", [...data.items, { description: "", qty: "", unit_price: "" }]);
  }

  function removeItem(index) {
    const updatedItems = data.items.filter((_, i) => i !== index);
    setData("items", updatedItems);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-PurpleFive hover:bg-primaryPurple" onClick={() => setOpen(true)}>
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Data Produk Masuk</DialogTitle>
          <DialogDescription>Masukkan data produk yang masuk, lalu klik Simpan.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {data.items.map((item, index) => (
            <div key={index} className="mt-4 border p-3 rounded-md relative">
              <InputLabel htmlFor={`description_${index}`} value={`Item Description ${index + 1}`} />
              <TextInput
                id={`description_${index}`}
                name={`description_${index}`}
                required
                className="mt-1 block w-full border p-2 rounded-md"
                value={item.description}
                onChange={(e) => {
                  const updatedItems = [...data.items];
                  updatedItems[index].description = e.target.value;
                  setData("items", updatedItems);
                }}
              />

              <InputLabel htmlFor={`qty_${index}`} value="Quantity" />
              <input
                id={`qty_${index}`}
                type="number"
                required
                className="mt-1 block w-full border p-2 rounded-md"
                value={item.qty}
                onChange={(e) => {
                  const updatedItems = [...data.items];
                  updatedItems[index].qty = e.target.value;
                  setData("items", updatedItems);
                }}
              />

              <InputLabel htmlFor={`unit_price_${index}`} value="Unit Price" />
              <input
                id={`unit_price_${index}`}
                type="number"
                required
                className="mt-1 block w-full border p-2 rounded-md"
                value={item.unit_price}
                onChange={(e) => {
                  const updatedItems = [...data.items];
                  updatedItems[index].unit_price = e.target.value;
                  setData("items", updatedItems);
                }}
              />
              <p className="text-gray-600 text-sm mt-1">{formatRupiah(item.unit_price)}</p>

              {data.items.length > 1 && (
                <Button type="button" className="bg-red-500 text-white mt-2" onClick={() => removeItem(index)}>
                  Hapus Item
                </Button>
              )}
            </div>
          ))}
          <Button type="button" className="bg-blue-500 text-white mt-3" onClick={addItem}>
            + Tambah Item Description
          </Button>
          <br /><br />
          <InputLabel htmlFor="discount" value="Discount (%)" />
          <input
            id="discount"
            type="number"
            className="mt-1 block w-full border p-2 rounded-md"
            value={data.discount}
            onChange={(e) => setData("discount", e.target.value)}
          />

          <InputLabel htmlFor="tax" value="Tax (%)" />
          <input
            id="tax"
            type="number"
            className="mt-1 block w-full border p-2 rounded-md"
            value={data.tax}
            onChange={(e) => setData("tax", e.target.value)}
          />

            <InputLabel htmlFor="due_date" value="Due Date" />
            <input
            id="due_date"
            type="date"
            className="mt-1 block w-full border p-2 rounded-md"
            value={data.due_date}
            onChange={(e) => setData("due_date", e.target.value)}
            />

          <InputLabel htmlFor="total_amount" value="Total Amount" />
          <input
            id="total_amount"
            type="text"
            className="mt-1 block w-full border p-2 rounded-md bg-gray-100 cursor-not-allowed"
            value={formatRupiah(data.total_amount)}
            disabled
          />

          <InputLabel htmlFor="note" value="Note" />
          <textarea id="note" className="mt-1 block w-full border p-2 rounded-md" value={data.note} onChange={(e) => setData("note", e.target.value)} />

          <InputLabel htmlFor="terms_condition" value="Terms & Condition" />
          <textarea id="terms_condition" className="mt-1 block w-full border p-2 rounded-md" value={data.terms_condition} onChange={(e) => setData("terms_condition", e.target.value)} />

          {/* <InputLabel htmlFor="status_payment" value="Status Payment" />
            <select
            id="status_payment"
            className="mt-1 block w-full border p-2 rounded-md"
            value={data.status_payment}
            onChange={(e) => setData("status_payment", e.target.value)}
            >
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="scheduled">Scheduled</option>
            </select> */}
          
          <div className="mt-4">
                <InputLabel htmlFor="bp" value="Billed Party" />
                <select
                id="bp"
                name="bp"
                className="mt-1 block w-full border p-2 rounded-md"
                value={data.bp || ""}
                required
                onChange={(e) => setData("bp", e.target.value)}
                >
                <option value="">Pilih Billed Party</option> {}
                {bp.map((bp) => (
                    <option key={bp.id} value={bp.id}>{bp.bill_to}</option>
                ))}
                </select>

            </div>
          

          <DialogFooter>
            <Button type="button" className="bg-gray-200 text-black border border-gray-400 mt-5 hover:bg-gray-300" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white mt-5">
              Simpan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
