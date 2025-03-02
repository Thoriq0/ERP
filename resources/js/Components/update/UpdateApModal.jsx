import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import InputLabel from "../InputLabel";
import { useForm, usePage } from "@inertiajs/react";
import toast from "react-hot-toast";
import { router } from "@inertiajs/react"; 

const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(angka);
};

export function UpdateApModal({ userRole, open, onClose, inbound, productData, apData }) {
    const { flash } = usePage().props;
    
    const { data, setData, errors, setErrors, put, reset } = useForm({
        inbound_id: inbound?.id || "",
        // product_id: inbound?.product_id || "",
        qty: inbound?.qty || "",
        unit_price: inbound?.unit_price || "",
        tax: inbound?.tax || "",
        total_amount: inbound?.total_amount || "",
        due_date: inbound?.due_date || "",
        supplier_name: inbound?.product?.supplier?.name || "Tidak Diketahui",
        status_payment: inbound?.status_payment || "unpaid", 
    });

    const [includeTax, setIncludeTax] = useState(true);

    useEffect(() => {
        if (!inbound || apData.length === 0) return;
        // console.log("Inbound ID:", inbound?.id); 
        const selectedApData = apData.find(ap => Number(ap.inbound_id) === Number(inbound.inbound_id));

        setData(prevData => ({
            ...prevData,
            inbound_id: inbound?.id || "",
            qty: selectedApData?.inbound?.qty ?? "",
            unit_price: selectedApData?.unit_price ?? "",
            tax: selectedApData?.tax ?? "",
            total_amount: selectedApData?.total_amount ?? "",
            due_date: selectedApData?.due_date || "",
            supplier_name: selectedApData?.inbound?.product?.supplier?.name ?? "Tidak Diketahui",
            status_payment: selectedApData?.status_payment ?? "unpaid",
        }));
    }, [inbound, apData]);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, { duration: 5000 });
            onClose();
        }
        if (flash?.error) {
            toast.error(flash.error, { duration: 5000 });
        }
    }, [flash]);

    useEffect(() => {
        const unitPrice = parseFloat(data.unit_price) || 0;
        const qty = parseInt(data.qty) || 0;
        const tax = parseFloat(data.tax) || 0;

        let total = unitPrice * qty;

        if (!includeTax) {
            total += (total * tax) / 100;
        }

        setData("total_amount", total);
    }, [data.unit_price, data.qty, data.tax, includeTax]);

    function handleSubmit(e) {
        e.preventDefault();

        const rolePaths = {
            admin: `/admin/ap/${inbound?.id}`,
            wrhs: `/wrhs/ap/${inbound?.id}`,
        };

        const userPath = rolePaths[userRole];

        put(userPath, data, {
            forceFormData: true,
            onError: (errors) => {
                setErrors(errors);
                toast.error("Gagal memperbarui Data Supplier! ❌");
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-[500px] md:max-w-[600px] overflow-y-auto border border-gray-300 p-10 rounded-md">
                <DialogHeader>
                    <DialogTitle>Update Data Inbound</DialogTitle>
                    <DialogDescription>Update data inbound yang masuk, lalu klik Simpan.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <InputLabel htmlFor="product_id" value="Product" />
                        <select
                            id="product_id"
                            name="product_id"
                            className="mt-1 block w-full border p-2 rounded-md"
                            value={data.product_id}
                            onChange={(e) => setData("product_id", e.target.value)}
                        >
                            {productData.map((product) => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="qty" value="Jumlah Produk" />
                        <input
                            id="qty"
                            type="number"
                            name="qty"
                            className="mt-1 block w-full border p-2 rounded-md"
                            value={data.qty}
                            onChange={(e) => setData("qty", e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="unit_price" value="Harga Per Unit" />
                        <input
                            id="unit_price"
                            type="number"
                            name="unit_price"
                            className="mt-1 block w-full border p-2 rounded-md"
                            value={data.unit_price}
                            onChange={(e) => setData("unit_price", e.target.value)}
                        />
                        <p className="text-gray-600 text-sm mt-1"> {formatRupiah(data.unit_price)} </p>
                    </div>

                    <div className="mt-4 flex items-center">
                        <input
                            type="checkbox"
                            id="includeTax"
                            checked={includeTax}
                            onChange={() => setIncludeTax(!includeTax)}
                            className="mr-2"
                        />
                        <label htmlFor="includeTax">Include Tax</label>
                    </div>

                    {!includeTax && (
                        <div className="mt-4">
                            <InputLabel htmlFor="tax" value="Tax (%)" />
                            <input
                                id="tax"
                                type="number"
                                name="tax"
                                className="mt-1 block w-full border p-2 rounded-md"
                                value={data.tax}
                                onChange={(e) => setData("tax", e.target.value)}
                            />
                        </div>
                    )}

                    <div className="mt-4">
                        <InputLabel htmlFor="total_amount" value="Total Amount" />
                        <input
                            id="total_amount"
                            type="text"
                            name="total_amount"
                            className="mt-1 block w-full border p-2 rounded-md bg-gray-100 cursor-not-allowed"
                            value={formatRupiah(data.total_amount)}
                            disabled
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="due_date" value="Due Date" />
                        <input
                            id="due_date"
                            type="date"
                            name="due_date"
                            className="mt-1 block w-full border p-2 rounded-md"
                            value={data.due_date}
                            onChange={(e) => setData("due_date", e.target.value)}
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="supplier_name" value="Nama Supplier" />
                        <input
                            id="supplier_name"
                            type="text"
                            name="supplier_name"
                            className="mt-1 block w-full border p-2 rounded-md"
                            value={data.supplier_name}
                            readOnly
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="status_payment" value="Status Pembayaran" />
                        <select
                            id="status_payment"
                            name="status_payment"
                            className="mt-1 block w-full border p-2 rounded-md"
                            value={data.status_payment}
                            onChange={(e) => setData("status_payment", e.target.value)}
                        >
                            <option value="unpaid">Unpaid</option>
                            <option value="scheduled">scheduled</option>
                            <option value="paid">Paid</option>
                            <option value="overdue">Overdue</option>
                        </select>
                    </div>

                    <DialogFooter>
                        <Button type="button" className="bg-gray-200 text-black border border-gray-400 mt-5 hover:bg-gray-300" onClick={onClose}>
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
